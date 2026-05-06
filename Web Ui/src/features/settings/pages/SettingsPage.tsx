import React, { useEffect, useState } from 'react';
import { useSettings } from '../hooks/useSettings';
import { PromptConfiguration, PromptItem } from '../components/PromptConfiguration';
import { FeatureFlags } from '../components/FeatureFlags';
import FeatureScreenLayout from '../../../shared/components/FeatureScreenLayout';
import FeaturePageHeader from '../../../shared/components/FeaturePageHeader';
import FeatureListSection from '../../../shared/components/FeatureListSection';
import ContentState from '../../../shared/components/ContentState';

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

  return (
    <FeatureScreenLayout className="settings-page">
      <FeaturePageHeader title="Configuración de Prompt" />

      {loading && !prompts ? (
        <FeatureListSection>
          <ContentState
            variant="loading"
            title="Cargando..."
            description="Se están cargando los ajustes del sistema."
          />
        </FeatureListSection>
      ) : error ? (
        <FeatureListSection>
          <ContentState
            variant="error"
            title="Error al cargar..."
            description={error}
          />
        </FeatureListSection>
      ) : null}

      {prompts && (
        <FeatureListSection>
          <PromptConfiguration
            prompts={promptItems}
            selectedPrompt={selectedPrompt}
            onChangePrompt={setSelectedPrompt}
            onSavePrompt={handleSavePrompt}
            saving={savingPrompt}
          />
        </FeatureListSection>
      )}

      {flags && flags.length > 0 && (
        <FeatureListSection title="Habilitación de Funcionalidades:">
          <FeatureFlags
            flags={flags}
            onToggleFlag={handleToggleFlag}
            saving={savingFlag}
          />
        </FeatureListSection>
      )}
    </FeatureScreenLayout>
  );
};

export default SettingsPage;
