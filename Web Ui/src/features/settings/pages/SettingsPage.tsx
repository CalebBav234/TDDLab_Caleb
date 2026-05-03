import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSettings } from '../hooks/useSettings';
import { PromptConfiguration, PromptItem } from '../components/PromptConfiguration';
import { FeatureFlags } from '../components/FeatureFlags';
import FeatureScreenLayout from '../../../shared/components/FeatureScreenLayout';
import FeaturePageHeader from '../../../shared/components/FeaturePageHeader';
import FeatureListSection from '../../../shared/components/FeatureListSection';
import FeatureSectionDivider from '../../../shared/components/FeatureSectionDivider';
import ContentState from '../../../shared/components/ContentState';

const ErrorAlert = styled(Alert)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const PromptSection = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const SettingsPage: React.FC = () => {
  const {
    prompts,
    flags,
    loading,
    savingPrompt,
    savingFlag,
    error,
    loadSettings,
    savePrompt,
    toggleFeatureFlag
  } = useSettings();

  const [selectedPrompt, setSelectedPrompt] = useState<string>('tddPrompt');

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const promptItems: PromptItem[] = prompts
    ? [
        { id: 'tddPrompt', name: 'Analizar TDD Prompt', content: prompts.tddPrompt },
        { id: 'refactoringPrompt', name: 'Analizar Refactoring Prompt', content: prompts.refactoringPrompt },
        { id: 'evaluateTDDPrompt', name: 'Evaluar TDD Prompt', content: prompts.evaluateTDDPrompt },
      ]
    : [];

  const handleSavePrompt = async (promptId: string, newContent: string) => {
    if (!prompts) return;
    const tdd = promptId === 'tddPrompt' ? newContent : prompts.tddPrompt;
    const refac = promptId === 'refactoringPrompt' ? newContent : prompts.refactoringPrompt;
    const evalPrompt = promptId === 'evaluateTDDPrompt' ? newContent : prompts.evaluateTDDPrompt;
    
    try {
      await savePrompt(tdd, refac, evalPrompt);
    } catch (e) {
      // Error handled by useSettings hook (UI feedback)
    }
  };

  const handleToggleFlag = async (id: number, newValue: boolean) => {
    try {
      await toggleFeatureFlag(id, newValue);
    } catch (e) {
      // Error handled by useSettings hook (UI feedback)
    }
  };

  if (loading && !prompts) {
    return (
      <FeatureScreenLayout>
        <ContentState
          variant="loading"
          title="Cargando configuración"
          description="Se están cargando los ajustes del sistema."
        />
      </FeatureScreenLayout>
    );
  }

  return (
    <FeatureScreenLayout className="settings-page" sectionGap={0}>
      <FeaturePageHeader title="Configuración de Prompt" />

      {error && (
        <ErrorAlert severity="error">
          {error}
        </ErrorAlert>
      )}

      <PromptSection>
        <FeatureListSection>
          {prompts && (
            <PromptConfiguration
              prompts={promptItems}
              selectedPrompt={selectedPrompt}
              onChangePrompt={setSelectedPrompt}
              onSavePrompt={handleSavePrompt}
              saving={savingPrompt}
            />
          )}
        </FeatureListSection>
      </PromptSection>

      <FeatureSectionDivider />

      <FeatureListSection title="Habilitación de Funcionalidades:">
        {flags && flags.length > 0 && (
          <FeatureFlags
            flags={flags}
            onToggleFlag={handleToggleFlag}
            saving={savingFlag}
          />
        )}
      </FeatureListSection>
    </FeatureScreenLayout>
  );
};

export default SettingsPage;
