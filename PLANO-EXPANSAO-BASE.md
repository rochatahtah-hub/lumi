# 🎯 PLANO DE EXPANSÃO — BASE EDUCACIONAL LUMI

**Objetivo:** Expandir de 35-40% para 85%+ de cobertura educacional

**Duração Estimada:** 4 semanas de trabalho focado

**Estratégia:** Sistemática, por matéria, por série, por tópico

---

## 📋 FASES DE IMPLEMENTAÇÃO

### **FASE 1 — CRÍTICAS (Semana 1)**

Duração: 40-50 horas  
Objetivo: Cobrir as matérias com menos de 10% de cobertura

#### **1.1 FÍSICA — Criar do Zero**

**Arquivo:** `src/content/lessons/fisica.ts`

**Estrutura:**
```typescript
// Introdução à Física
export const introducao_fisica: Lesson
export const grandezas_unidades: Lesson

// Cinemática
export const movimento: Lesson
export const velocidade_aceleracao: Lesson
export const graficos_movimento: Lesson

// Dinâmica
export const forcas: Lesson
export const leis_newton: Lesson
export const trabalho_energia: Lesson
export const potencia: Lesson

// Quantidade de Movimento
export const quantidade_movimento: Lesson
export const impulso: Lesson

// Gravitação
export const gravitacao: Lesson

// Estática de Fluidos
export const pressao: Lesson
export const hidrostática: Lesson

// Termologia
export const temperatura_calor: Lesson
export const escalas_termometricas: Lesson
export const propagacao_calor: Lesson
export const termodinâmica: Lesson

// Ondas
export const ondas_mecanicas: Lesson
export const acustica: Lesson

// Óptica
export const luz_reflexao_refracao: Lesson
export const lentes_espelhos: Lesson
export const optica_olho: Lesson

// Eletricidade
export const carga_eletrica: Lesson
export const eletrostatica: Lesson
export const potencial_eletrico: Lesson
export const corrente_eletrica: Lesson
export const resistencia_ohm: Lesson
export const circuitos_eletricos: Lesson
export const potencia_eletrica: Lesson

// Magnetismo
export const magnetismo: Lesson
export const eletromagnetismo: Lesson
export const inducao_eletromagnetica: Lesson

// Física Moderna
export const fisica_moderna: Lesson
export const radioatividade: Lesson
export const quanta: Lesson
```

**Especificações por Tópico:**

Cada lição deve conter:
- ✅ Conceito (com 4 variações)
- ✅ Fórmulas (com significado das variáveis)
- ✅ Exemplos (3-5 exemplos)
- ✅ Exercícios (10+ exercícios, múltiplos tipos)
- ✅ Gráficos/Diagramas (descrição)
- ✅ Aplicações práticas
- ✅ Erros comuns
- ✅ Palavras-chave + sinônimos

**Cronograma:**
- Dia 1-2: Estrutura + 5 primeiras lições (Introdução, Grandezas, Movimento, Velocidade, Gráficos)
- Dia 3-4: Dinâmica + Leis de Newton (3 lições)
- Dia 5-6: Trabalho, Energia, Quantidade de Movimento (3 lições)
- Dia 7-8: Gravitação + Fluidostática (2 lições)
- Dia 9-10: Termologia (4 lições)

---

#### **1.2 QUÍMICA — Criar do Zero**

**Arquivo:** `src/content/lessons/quimica.ts`

**Estrutura:**
```typescript
// Matéria
export const materia_propriedades: Lesson
export const estados_fisicos: Lesson
export const mudancas_estado: Lesson

// Átomos
export const atomo_composicao: Lesson
export const numeros_atomicos: Lesson
export const modelos_atomicos: Lesson
export const eletrons_niveis_energia: Lesson

// Tabela Periódica
export const tabela_periodica: Lesson
export const propriedades_periodicas: Lesson
export const familias_grupos: Lesson

// Ligações Químicas
export const ligacao_ionica: Lesson
export const ligacao_covalente: Lesson
export const ligacao_metalica: Lesson
export const eletronegatividade: Lesson

// Funções Inorgânicas
export const acidos: Lesson
export const bases: Lesson
export const sais: Lesson
export const oxidos: Lesson

// Reações Químicas
export const reacoes_quimicas: Lesson
export const balanceamento: Lesson
export const tipos_reacao: Lesson

// Cálculos
export const mol_molar: Lesson
export const estequiometria: Lesson
export const equacoes_balanceadas: Lesson

// Soluções
export const solucoes_misturas: Lesson
export const concentracao_molar: Lesson
export const diluicao: Lesson
export const saturacao: Lesson

// Gases
export const teoria_cinetica_gases: Lesson
export const leis_gases: Lesson
export const condicoes_normais: Lesson

// Termoquímica
export const entalpia: Lesson
export const reacoes_exotermicas_endotermicas: Lesson

// Cinética
export const velocidade_reacao: Lesson
export const fatores_velocidade: Lesson
export const catalise: Lesson

// Equilíbrio
export const equilbrio_dinamico: Lesson
export const constante_equilibrio: Lesson

// Eletroquímica
export const oxidacao_reducao: Lesson
export const pilhas_eletrolise: Lesson

// Química Orgânica
export const hidrocarbonetos: Lesson
export const funcoes_organicas: Lesson
export const isomeria: Lesson
export const polimeros: Lesson
export const bioquimica: Lesson
```

**Cronograma:**
- Dia 1-2: Matéria + Átomos (4 lições)
- Dia 3: Tabela Periódica (2 lições)
- Dia 4-5: Ligações (4 lições)
- Dia 6-7: Funções Inorgânicas (4 lições)
- Dia 8-9: Reações + Cálculos (4 lições)
- Dia 10: Soluções + Gases (4 lições)

---

#### **1.3 BIOLOGIA — Expandir de 15% para 70%**

**Arquivo:** Expandir `biologia-simples.ts` ou criar `biologia-completa.ts`

**Adicionar:**
```typescript
// Citologia (expandir)
export const celula_procariota_eucariota: Lesson
export const organelas_funcao: Lesson
export const transporte_celular: Lesson

// Metabolismo
export const fotossintese: Lesson
export const respiracao_celular: Lesson
export const fermentacao: Lesson

// Divisão Celular
export const mitose: Lesson
export const meiose: Lesson
export const cromossomos_genes: Lesson

// Genética
export const dna_rna: Lesson
export const sintese_proteica: Lesson
export const heranca_genetica: Lesson
export const mutacoes: Lesson

// Evolução
export const teoria_evolucao: Lesson
export const selecao_natural: Lesson
export const especiacao: Lesson

// Classificação
export const taxonomia: Lesson
export const reinos_vida: Lesson
export const filos_principais: Lesson

// Fisiologia Humana
export const sistema_digestorio: Lesson
export const sistema_circulatorio: Lesson
export const sistema_respiratorio: Lesson
export const sistema_nervoso: Lesson
export const sistema_endocrino: Lesson
export const sistema_imunologico: Lesson
export const sistema_reprodutor: Lesson
export const sistema_excretor: Lesson

// Reprodução
export const reproducao_assexuada: Lesson
export const reproducao_sexuada: Lesson
export const embriologia: Lesson

// Ecologia (expandir)
export const populacoes: Lesson
export const comunidades: Lesson
export const biomas: Lesson
export const ciclos_biogeoquimicos: Lesson
export const sucessao_ecologica: Lesson

// Tópicos Especiais
export const microbiologia: Lesson
export const botânica: Lesson
export const zoologia: Lesson
export const biotecnologia: Lesson
export const bioética: Lesson
```

---

#### **1.4 REDAÇÃO — Separar e Especializar**

**Arquivo:** `src/content/lessons/redacao.ts`

**Estrutura:**
```typescript
// Teoria
export const estrutura_textual: Lesson
export const introducao: Lesson
export const desenvolvimento: Lesson
export const conclusao: Lesson

// Argumentation
export const tipos_argumento: Lesson
export const conectivos: Lesson
export const coesao_coerencia: Lesson

// Dissertativo-Argumentativa
export const redacao_dissertativa: Lesson
export const tese: Lesson
export const repertorio_cultural: Lesson

// Prática
export const analise_proposta: Lesson
export const planejamento: Lesson
export const revisao: Lesson
export const corracao: Lesson

// ENEM/Vestibulares
export const redacao_enem: Lesson
export const criterios_avaliacao: Lesson
export const redacoes_modelo: Lesson

// Tipos de Texto
export const texto_narrativo: Lesson
export const texto_descritivo: Lesson
export const texto_expositivo: Lesson
```

---

### **FASE 2 — ALTAS (Semana 2)**

Duração: 40-50 horas

#### **2.1 PORTUGUÊS — Expandir de 25% para 80%**

Adicionar a `por-gramatica.ts` e `por-texto.ts`:

```typescript
// Alfabetização (para 1º-3º ano)
export const letras_e_sons: Lesson
export const silabas: Lesson
export const palavras_frases: Lesson

// Leitura progressiva
export const compreensao_leitura: Lesson
export const velocidade_leitura: Lesson
export const tipo_leitura: Lesson

// Ortografia
export const uso_til: Lesson
export const uso_trema: Lesson
export const plural_diminutivo: Lesson
export const m_n_final: Lesson
export const s_ss_c_cc: Lesson

// Pontuação (expandir)
export const ponto_virgula_dois_pontos: Lesson
export const aspas_parenteses: Lesson
export const travessao: Lesson

// Classes Gramaticais (completar)
export const adjetivo: Lesson
export const adverbio: Lesson
export const preposicao: Lesson
export const conjuncao: Lesson
export const interjeicao: Lesson
export const numeral: Lesson

// Sintaxe
export const sintagma: Lesson
export const sujeito_predicado: Lesson
export const termos_acessorios: Lesson
export const periodo_composto: Lesson
export const oracoes_subordinadas: Lesson

// Concordância
export const concordancia_verbal: Lesson
export const concordancia_nominal: Lesson

// Regência
export const regencia_verbal: Lesson
export const regencia_nominal: Lesson

// Crase
export const uso_crase: Lesson
export const casos_crase: Lesson

// Semântica
export const sinonimos_antonimos: Lesson
export const polissemia: Lesson
export const homonimos_paronimos: Lesson
export const campo_semantico: Lesson

// Figuras de Linguagem (expandir)
export const metafora: Lesson
export const personificacao: Lesson
export const hiperbole: Lesson
export const ironia: Lesson
export const paradoxo: Lesson

// Variação Linguística
export const dialetos_sotaques: Lesson
export const registros_linguisticos: Lesson
export const linguagem_formal_informal: Lesson

// Argumentação
export const argumentacao: Lesson
export const falácia: Lesson
export const persuasao: Lesson

// Literatura
export const literatura_brasileira: Lesson
export const literatura_portuguesa: Lesson
export const movimentos_literarios: Lesson
export const generos_literarios: Lesson
export const autores_obras: Lesson

// Gêneros Textuais
export const artigo_opiniao: Lesson
export const cronica: Lesson
export const ensaio: Lesson
export const correspondencia: Lesson
export const anuncio_publicidade: Lesson
```

---

#### **2.2 MATEMÁTICA — Expandir de 35% para 85%**

Adicionar a `mat-fund1.ts`, `mat-fund2.ts`, `mat-medio.ts`:

```typescript
// Números (completar)
export const numeros_romanos: Lesson
export const divisibilidade: Lesson
export const mmc_mdc: Lesson
export const numeros_racionais: Lesson
export const numeros_irracionais: Lesson
export const numeros_reais: Lesson

// Álgebra
export const expressoes_numericas: Lesson
export const expressoes_algebricas: Lesson
export const polinomios: Lesson
export const produtos_notaveis: Lesson
export const fatoracao: Lesson
export const fracoes_algebricas: Lesson

// Sistemas
export const sistema_equacoes: Lesson
export const metodos_resolucao: Lesson

// Inequações
export const inequacao_primeiro_grau: Lesson
export const inequacao_segundo_grau: Lesson
export const sistema_inequacoes: Lesson

// Funções (expandir)
export const funcao_quadratica: Lesson
export const funcao_exponencial: Lesson
export const funcao_logaritmica: Lesson
export const funcao_trigonometrica: Lesson

// Polinômios
export const raizes_polinomios: Lesson
export const divisao_polinomios: Lesson

// Geometria (expandir)
export const triangulos: Lesson
export const quadrilateros: Lesson
export const poligonos: Lesson
export const circunferencia: Lesson
export const transformacoes_geometricas: Lesson

// Geometria Espacial
export const prismas: Lesson
export const piramides: Lesson
export const cilindro: Lesson
export const cone: Lesson
export const esfera: Lesson

// Trigonometria
export const seno_cosseno_tangente: Lesson
export const relacoes_trigonometricas: Lesson
export const lei_senos_cossenos: Lesson
export const trigonometria_ciclo: Lesson

// Geometria Analítica
export const plano_cartesiano: Lesson
export const distancia_ponto: Lesson
export const reta: Lesson
export const circunferencia_eq: Lesson
export const secoes_conicas: Lesson

// Análise Combinatória
export const principio_contagem: Lesson
export const permutacao: Lesson
export const arranjo: Lesson
export const combinacao: Lesson
export const binomio_newton: Lesson

// Probabilidade
export const espacos_amostrais: Lesson
export const probabilidade_evento: Lesson
export const probabilidade_condicional: Lesson
export const distribuicoes: Lesson

// Progressões
export const progressao_aritmetica: Lesson
export const progressao_geometrica: Lesson

// Logaritmos
export const logaritmos: Lesson
export const propriedades_logaritmo: Lesson

// Matrizes
export const matrizes_operacoes: Lesson
export const determinantes: Lesson
export const sistemas_matriz: Lesson

// Estatística
export const coleta_dados: Lesson
export const medidas_posicao: Lesson
export const medidas_dispersao: Lesson
export const distribuicao_frequencia: Lesson

// Matemática Financeira
export const juros_simples: Lesson
export const juros_compostos: Lesson
export const financiamentos: Lesson
export const amortizacao: Lesson
```

---

### **FASE 3 — MÉDIAS (Semana 3)**

Duração: 30-40 horas

#### **3.1 GEOGRAFIA — Criar do Zero**

**Arquivo:** `src/content/lessons/geografia.ts`

Com 20+ tópicos

#### **3.2 HISTÓRIA — Criar do Zero**

**Arquivo:** `src/content/lessons/historia.ts`

Com 13+ tópicos

---

### **FASE 4 — OUTRAS (Semana 4)**

- Artes
- Educação Física
- Tecnologia
- Expandir Idiomas

---

## 🔧 PADRÃO DE IMPLEMENTAÇÃO

Cada novo arquivo deve seguir:

```typescript
import type { Lesson } from '../../types'

const BNCC = { 
  title: 'Base Nacional Comum Curricular (BNCC) — [Matéria]', 
  url: 'http://basenacionalcomum.mec.gov.br/', 
  kind: 'curriculo' 
} as const

export const topic_id: Lesson = {
  id: 'mat-topic-id',
  subject: 'materia',
  title: 'Título do Tópico',
  levels: ['fund1', 'fund2', 'medio'],
  grade: 'Série apropriada',
  
  // ⭐ CRÍTICO: Palavras-chave + sinônimos
  aliases: [
    'palavra-chave-1',
    'sinonimo-1',
    'variacao-linguistica-1',
    // ... mais 15-20 aliases
  ],
  
  summary: 'Resumo em 1-2 linhas',
  intro: 'Introdução informal (2-3 linhas)',
  
  skills: {
    skill1: 'Descrição da habilidade 1',
    skill2: 'Descrição da habilidade 2',
    // ...
  },
  
  blocks: [
    {
      id: 'b1',
      skill: 'skill1',
      title: 'Título da seção',
      text: 'Explicação',
      example: 'Exemplo simples',
      variants: {
        simples: 'Variação bem simples',
        exemplo: 'Variação com exemplo',
        outra: 'Outra explicação',
        detalhado: 'Versão mais detalhada e matemática',
      },
    },
    // ... mais blocks
  ],
  
  questions: [
    // Mínimo 12 questões
    // Múltiplos tipos: mc, tf, fill, match, open
    // Múltiplas dificuldades: 1 (fácil), 2 (médio), 3 (difícil)
  ],
  
  review: [
    'Ponto-chave 1',
    'Ponto-chave 2',
    // ... (5-7 pontos)
  ],
  
  sources: [
    BNCC,
    { title: 'Conteúdo autoral LUMI', kind: 'autoral' }
  ],
}
```

---

## 🎯 MÉTRICAS DE SUCESSO

- ✅ Cobertura final: 85%+
- ✅ Cada matéria tem 15+ tópicos principais
- ✅ Cada tópico tem 4 variações de explicação
- ✅ Cada tópico tem 12+ exercícios
- ✅ Cada tópico tem 20+ aliases (palavras-chave + sinônimos)
- ✅ Base total: 50.000+ linhas de código
- ✅ Perguntas: 5.000+

---

## 📅 CRONOGRAMA

| Semana | Fase | Matérias | Linhas Est. |
|--------|------|----------|------------|
| 1 | Críticas | Física, Química, Biologia, Redação | 12.000 |
| 2 | Altas | Português, Matemática | 15.000 |
| 3 | Médias | Geografia, História | 8.000 |
| 4 | Outras | Artes, Ed.Física, Tech, Idiomas | 10.000 |
| **Total** | | | **45.000** |

---

## ⚠️ PRÓXIMOS PASSOS

1. Começar **Física** (Arquivo novo, 25 tópicos)
2. Começar **Química** (Arquivo novo, 20 tópicos)
3. Expandir **Biologia** (15 novos tópicos)
4. Separar e especializar **Redação**
5. Ao terminar Fase 1, revisar cobertura antes de começar Fase 2

---

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
