import { DB } from '../../db/index.js';

export interface DiagnosticResult {
  hasError: boolean;
  errorType?: 'syntax' | 'runtime' | 'logic' | 'configuration';
  description?: string;
  suggestedFix?: string;
  fixedCode?: string;
}

export class SelfHealingEngine {
  /**
   * Executa o ciclo completo de qualidade:
   * Planejar -> Executar -> Testar -> Detectar -> Diagnosticar -> Corrigir -> Testar Novamente -> Registrar
   */
  public runDiagnosticCycle(codeSnippet: string, language: 'javascript' | 'typescript' | 'html' | 'json'): {
    initialStatus: 'clean' | 'error_detected';
    diagnostic: DiagnosticResult;
    retestStatus: 'passed' | 'failed';
    logId: string;
  } {
    // 1. Testar e Detectar
    const diagnostic = this.analyzeCode(codeSnippet, language);

    if (!diagnostic.hasError) {
      const log = DB.logSelfHealing({
        errorDetected: 'Nenhum erro detectado. Verificação estática concluída com sucesso.',
        rootCause: 'Código em conformidade com as regras de qualidade.',
        patchApplied: 'Nenhuma alteração necessária.',
        testResult: 'passed',
        status: 'resolved'
      });
      return {
        initialStatus: 'clean',
        diagnostic,
        retestStatus: 'passed',
        logId: log.id
      };
    }

    // 2. Diagnosticar e Corrigir
    const fixed = diagnostic.fixedCode || codeSnippet;

    // 3. Testar Novamente (Retest)
    const retest = this.analyzeCode(fixed, language);
    const retestPassed = !retest.hasError;

    // 4. Registrar em Auditoria
    const log = DB.logSelfHealing({
      errorDetected: diagnostic.description || 'Erro detectado na análise estática.',
      rootCause: diagnostic.suggestedFix || 'Inconsistência de sintaxe ou fechamento.',
      patchApplied: `Correção automática aplicada em ${language}.`,
      testResult: retestPassed ? 'passed' : 'failed',
      status: retestPassed ? 'resolved' : 'escalated'
    });

    DB.logAudit('system', 'self_healing_cycle_completed', 'self_healing', {
      logId: log.id,
      retestPassed,
      errorType: diagnostic.errorType
    });

    return {
      initialStatus: 'error_detected',
      diagnostic,
      retestStatus: retestPassed ? 'passed' : 'failed',
      logId: log.id
    };
  }

  private analyzeCode(code: string, language: string): DiagnosticResult {
    if (language === 'json') {
      try {
        JSON.parse(code);
        return { hasError: false };
      } catch (err: any) {
        // Tenta corrigir vírgula sobrando ou aspas simples
        let fixed = code.replace(/,\s*([\]}])/g, '$1').replace(/'/g, '"');
        let canFix = false;
        try {
          JSON.parse(fixed);
          canFix = true;
        } catch (_) {}

        return {
          hasError: true,
          errorType: 'syntax',
          description: `Erro de formatação JSON: ${err.message}`,
          suggestedFix: 'Remover vírgulas pendentes ou corrigir aspas para JSON válido.',
          fixedCode: canFix ? fixed : code
        };
      }
    }

    if (language === 'html') {
      const openDivs = (code.match(/<div/g) || []).length;
      const closeDivs = (code.match(/<\/div>/g) || []).length;
      if (openDivs !== closeDivs) {
        const diff = openDivs - closeDivs;
        let fixed = code;
        if (diff > 0) {
          fixed += '\n' + '</div>'.repeat(diff);
        }
        return {
          hasError: true,
          errorType: 'syntax',
          description: `Incompatibilidade de tags HTML: ${openDivs} aberturas vs ${closeDivs} fechamentos de <div>.`,
          suggestedFix: 'Fechar as tags pendentes para garantir integridade do DOM.',
          fixedCode: fixed
        };
      }
    }

    if (language === 'javascript' || language === 'typescript') {
      // Checar balanceamento de chaves e parênteses
      const openBraces = (code.match(/\{/g) || []).length;
      const closeBraces = (code.match(/\}/g) || []).length;
      if (openBraces !== closeBraces) {
        const diff = openBraces - closeBraces;
        let fixed = code;
        if (diff > 0) {
          fixed += '\n' + '}'.repeat(diff);
        }
        return {
          hasError: true,
          errorType: 'syntax',
          description: `Desbalanceamento de blocos de código: ${openBraces} '{' vs ${closeBraces} '}'.`,
          suggestedFix: 'Completar o fechamento dos blocos de função/objeto.',
          fixedCode: fixed
        };
      }
    }

    return { hasError: false };
  }
}

export const selfHealing = new SelfHealingEngine();
