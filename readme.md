# Categorizador Inteligente de Produtos

Este projeto implementa uma solução robusta e inteligente em Node.js para categorizar produtos de supermercado, identificando automaticamente itens equivalentes mesmo que apresentem pequenas variações na descrição.

## Objetivo

O objetivo desta solução é categorizar automaticamente produtos de diferentes supermercados considerando variações comuns como:

- Diferenças na ordem das palavras
- Pequenas variações de descrição
- Diferenças de capitalização
- Sinônimos comuns nas embalagens (ex: "semi-desnatado" vs "semi desnatado")
- Diferenças nas unidades de medida (ex: "1 litro" vs "1L")

A categorização leva em consideração, obrigatoriamente, a diferenciação de produtos por:

- Tipos específicos (ex: integral, desnatado)
- Marcas diferentes
- Tamanhos ou quantidades diferentes

## Principais casos tratados

### 1. Ordenação e capitalização

Produtos com títulos semelhantes, mas com palavras em ordem diferente ou letras maiúsculas/minúsculas, são tratados como equivalentes.

**Exemplo:**
- `"Arroz Branco Tio João 5kg"`
- `"Arroz Tio João Branco 5kg"`

**Solução:**
- Conversão para letras minúsculas.
- Ordenação das palavras alfabeticamente após remover atributos específicos (marca, tipo, tamanho).

### 2. Tratamento de unidades de medida

Diferentes formas de descrever unidades foram uniformizadas:

**Exemplo:**
- `"1 Litro"` e `"1L"`
- `"1 Quilo"` e `"1kg"`

**Solução:**
- Uso de expressões regulares para padronizar as unidades, convertendo-as consistentemente para formas abreviadas (`l` e `kg`).

### 3. Tratamento de sinônimos específicos

Alguns produtos podem usar sinônimos comuns nas suas descrições, gerando categorização incorreta se não forem tratados adequadamente.

**Exemplos:**
- `"Leite Semi-Desnatado"` vs `"Leite Semi Desnatado"`
- `"Leite Zero Lactose"` vs `"Leite Sem Lactose"`

**Solução:**
- Padronização de termos com expressões regulares que substituem termos sinônimos por uma única forma consistente ("semidesnatado" e "sem lactose").

## Como utilizar a solução

### Pré-requisitos

- Node.js instalado na sua máquina

### Execução

1. Clone este repositório:

```bash
git clone [url-do-seu-repositório]
```

2. Instale as dependências (se houver):

```bash
npm install
```

3. Execute a categorização dos produtos a partir de um arquivo JSON:

Coloque seu arquivo JSON com os produtos (`data01.json`) no diretório do projeto e execute:

```bash
node index.js
```

### Formato de entrada e saída

A solução espera um arquivo JSON no seguinte formato:

**Entrada:**
```json
[
  {
    "id": 1,
    "title": "Leite Integral Piracanjuba 1L",
    "supermarket": "Supermercado A"
  },
  {
    "id": 2,
    "title": "Leite Piracanjuba Integral 1L",
    "supermarket": "Supermercado B"
  }
]
```

**Saída:**

```json
[
  {
    "category": "Leite Integral Piracanjuba 1L",
    "count": 2,
    "products": [
      {"title": "Leite Integral Piracanjuba 1L", "supermarket": "Supermercado A"},
      {"title": "Leite Piracanjuba Integral 1L", "supermarket": "Supermercado B"}
    ]
  }
]
```

## Estrutura do código

- **`generateKey(title)`**: Responsável por criar uma chave única e consistente que identifica produtos equivalentes.
- **`categorizeProducts(products)`**: Usa as chaves geradas para agrupar e categorizar os produtos.

## Tecnologias utilizadas

- Node.js
- Expressões Regulares (Regex)

## Considerações finais

A solução apresentada é eficaz na categorização precisa e inteligente dos produtos de supermercado, considerando cuidadosamente as variações comuns encontradas em descrições de produtos reais.

Sinta-se à vontade para contribuir ou sugerir melhorias.