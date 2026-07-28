'use client';

import { useState, useCallback, useMemo } from 'react';
import { ConfiguratorPart, SlotType, ProductSlot } from '@/types/part';
import { Personalization, ProductType, SelectedPart } from '@/types/configuration';
import {
  computeFullPricing,
  buildStoryNarrative,
  validateConfiguration,
} from '@/lib/pricing/engine';

interface ConfiguratorState {
  currentStep: number;
  selectedParts: SelectedPart[];
  personalization: Personalization;
  clientNotes: string;
}

export function useConfigurator(slots: ProductSlot[], productType: ProductType) {
  const [state, setState] = useState<ConfiguratorState>({
    currentStep: 0,
    selectedParts: [],
    personalization: {
      engraving: undefined,
      lengthAdjustment: undefined,
      giftWrapping: false,
      giftWrappingPrice: 0,
      ringSize: undefined,
    },
    clientNotes: '',
  });

  const requiredSlots = useMemo(
    () => slots.filter((s) => s.required).map((s) => s.slotType),
    [slots]
  );

  const validation = useMemo(
    () =>
      validateConfiguration(
        state.selectedParts,
        requiredSlots,
        productType,
        state.personalization
      ),
    [state.selectedParts, requiredSlots, productType, state.personalization]
  );

  const pricing = useMemo(
    () =>
      computeFullPricing(
        state.selectedParts,
        state.selectedParts.map((sp) => sp.part),
        state.personalization,
        productType
      ),
    [state.selectedParts, state.personalization, productType]
  );

  const storyNarrative = useMemo(
    () => buildStoryNarrative(state.selectedParts),
    [state.selectedParts]
  );

  const currentSlot = slots[state.currentStep];

  const selectPart = useCallback(
    (part: ConfiguratorPart) => {
      setState((prev) => {
        const personalization =
          part.slotType === 'size'
            ? { ...prev.personalization, ringSize: part.name }
            : prev.personalization;

        const existing = prev.selectedParts.find((sp) => sp.part.slotType === part.slotType);

        if (existing && !currentSlot?.allowsMultiple) {
          return {
            ...prev,
            personalization,
            selectedParts: prev.selectedParts.map((sp) =>
              sp.part.slotType === part.slotType
                ? { ...sp, part, addedAt: new Date().toISOString() }
                : sp
            ),
          };
        }

        const allowsMultiple =
          currentSlot?.allowsMultiple && part.slotType === currentSlot?.slotType;

        if (allowsMultiple) {
          const already = prev.selectedParts.find((sp) => sp.part.id === part.id);
          if (already) {
            return {
              ...prev,
              selectedParts: prev.selectedParts.filter((sp) => sp.part.id !== part.id),
            };
          }
          const currentCount = prev.selectedParts.filter(
            (sp) => sp.part.slotType === part.slotType
          ).length;
          if (currentSlot.maxSelections && currentCount >= currentSlot.maxSelections) {
            return prev;
          }
          return {
            ...prev,
            personalization,
            selectedParts: [
              ...prev.selectedParts,
              { slotType: part.slotType, part, addedAt: new Date().toISOString() },
            ],
          };
        }

        return {
          ...prev,
          personalization,
          selectedParts: [
            ...prev.selectedParts.filter((sp) => sp.part.slotType !== part.slotType),
            { slotType: part.slotType, part, addedAt: new Date().toISOString() },
          ],
        };
      });
    },
    [currentSlot]
  );

  const removePart = useCallback((slotType: SlotType, partId?: string) => {
    setState((prev) => {
      const selectedParts = partId
        ? prev.selectedParts.filter(
            (sp) => !(sp.part.slotType === slotType && sp.part.id === partId)
          )
        : prev.selectedParts.filter((sp) => sp.part.slotType !== slotType);

      const personalization =
        slotType === 'size'
          ? { ...prev.personalization, ringSize: undefined }
          : prev.personalization;

      return { ...prev, selectedParts, personalization };
    });
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < slots.length) {
        setState((prev) => ({ ...prev, currentStep: step }));
      }
    },
    [slots.length]
  );

  const nextStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, slots.length - 1),
    }));
  }, [slots.length]);

  const prevStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0),
    }));
  }, []);

  const updatePersonalization = useCallback((updates: Partial<Personalization>) => {
    setState((prev) => ({
      ...prev,
      personalization: { ...prev.personalization, ...updates },
    }));
  }, []);

  const setClientNotes = useCallback((notes: string) => {
    setState((prev) => ({ ...prev, clientNotes: notes }));
  }, []);

  const reset = useCallback(() => {
    setState({
      currentStep: 0,
      selectedParts: [],
      personalization: {
        engraving: undefined,
        lengthAdjustment: undefined,
        giftWrapping: false,
        giftWrappingPrice: 0,
        ringSize: undefined,
      },
      clientNotes: '',
    });
  }, []);

  return {
    productType,
    currentStep: state.currentStep,
    currentSlot,
    selectedParts: state.selectedParts,
    personalization: state.personalization,
    clientNotes: state.clientNotes,
    pricing,
    storyNarrative,
    validation,
    progress: ((state.currentStep + 1) / slots.length) * 100,
    selectPart,
    removePart,
    goToStep,
    nextStep,
    prevStep,
    updatePersonalization,
    setClientNotes,
    reset,
  };
}
