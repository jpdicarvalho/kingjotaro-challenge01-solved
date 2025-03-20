import fs from 'fs';

// Função para gerar uma chave padronizada e detalhada a partir do título do produto
// tratando sinônimos, unidades e normalizando a string.
const generateKey = (title) => {
  const lowerTitle = title
    .toLowerCase()
    .replace(/[-,]/g, ' ') // substitui hífens e vírgulas por espaços
    .replace(/\b(zero lactose)\b/g, 'sem lactose') // normaliza "zero lactose" para "sem lactose"
    .replace(/\b(semi[- ]?desnatado)\b/g, 'semidesnatado') // uniformiza variações de "semidesnatado"
    .replace(/\b(\d+)\s?(litro|litros)\b/g, '$1l') // transforma unidades litros em formato curto
    .replace(/\b(\d+)\s?(quilo|quilos)\b/g, '$1kg') // transforma unidades quilos em formato curto
    .replace(/\s+/g, ' ') // remove múltiplos espaços
    .trim();

    // lista com tipos específicos para facilitar categorização
    const tipos = ['integral', 'desnatado', 'semidesnatado', 'branco', 'carioca', 'sem lactose'];

    // encontra o tipo específico no título, caso exista
    const tipo = tipos.find(t => lowerTitle.includes(t)) || '';

    // extrai o tamanho (ex: "1l", "5kg") do título
    const tamanho = lowerTitle.match(/(\d+(\.\d+)?(kg|l))/)?.[0] || '';

    // encontra a marca no título, caso esteja presente na lista
    const marca = lowerTitle.match(/(piracanjuba|italac|parmalat|tio joão|camil)/)?.[0] || '';

    // gera um nome genérico removendo tipo, tamanho e marca
    const nomeGenerico = lowerTitle
    .replace(tipo, '')
    .replace(tamanho, '')
    .replace(marca, '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .sort() // ordena palavras para garantir consistência na chave
    .join(' ');

    // retorna chave composta para facilitar agrupamento por similaridade
    return [nomeGenerico, marca, tipo, tamanho].filter(Boolean).join('|');
}

// Função que categoriza produtos com base na chave gerada acima
const categorizeProducts = (products) => {
    const categories = {};
    
    products.forEach((product) => {
        // gera uma chave única para cada produto
        const key = generateKey(product.title);
    
        // inicializa categoria se ainda não existir
        if (!categories[key]) {
          categories[key] = [];
        }

        // adiciona o produto na categoria correspondente
        categories[key].push({
            title: product.title,
            supermarket: product.supermarket,
        });
    });

    // converte o objeto em um array estruturado para retorno
    return Object.entries(categories).map(([_, products]) => ({
        category: products[0].title,
        count: products.length,
        products,
    }));
}

// Lendo os dados do arquivo data01.json
const input = JSON.parse(fs.readFileSync('data01.json', 'utf8'));
const categorized = categorizeProducts(input);

// Exibindo o resultado categorizado no terminal de forma organizada
console.log(JSON.stringify(categorized, null, 2));