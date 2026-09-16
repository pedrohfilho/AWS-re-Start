// ============================================================
//  data.js — Dados do curso AWS re/Start e utilitários de assunto
// ============================================================

function slug(s){
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
}

export const MONTHS = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];

export const MODULES = [
  {n:"Início do programa", items:[
    "Agenda do programa","Pesquisa de absorção do aluno do AWS re/Start","1 - Lab - Ambiente de Sandbox"
  ]},
  {n:"Introdução ao Cloud Foundations", items:[
    "Boas-vindas ao AWS re/Start","Quem sou eu?","Questionário Quem sou eu","O que é computação em nuvem?",
    "Atividade | Introdução aos Princípios de liderança da Amazon","Pensar grande","Metas de carreira","Introdução à computação",
    "2 - CF - KC - Introdução à computação em nuvem","Conceitos básicos de computação de nuvem","3 - CF - KC - Conceitos básicos de computação",
    "Funções da equipe de desenvolvimento","4 - CF - KC - Funções da equipe de desenvolvimento","5 - CF - KC - O que é computação em nuvem?",
    "Funções na nuvem","Definição de metas","Vantagens da computação em nuvem","208 - CF - KC - Vantagens da computação em nuvem",
    "Comunicação e metodologia STAR","O que é a AWS?","6 - CF - KC - O que é a Amazon Web Services?","Definição de preços da AWS",
    "7 - CF - KC - Fundamentos da definição de preço da AWS","Visão geral da Infraestrutura da AWS","8 - CF - KC - Visão geral da Infraestrutura da AWS",
    "Serviços e categorias da AWS","209 - CF - KC - Serviços e categorias da AWS","Modelo de responsabilidade compartilhada da AWS",
    "9 - CF - KC - Modelo de responsabilidade compartilhada","S3 da Amazon","Demonstração do S3 da AWS","10 - CF - KC - Introdução ao Amazon S3",
    "Elastic Compute da AWS","Demonstração do EC2 da AWS","11 - Lab - Introdução ao Amazon EC2","12 - CF - KC - Introdução ao Amazon EC2",
    "Boas-vindas à família da AWS re/Start! - 2"
  ]},
  {n:"Linux", items:[
    "Introdução ao Linux","225 - Lab - Introdução ao Linux","226 - LX - KC - Uma introdução ao Linux",
    "Linha de comando do Linux","227 - Lab - Linha de comando do Linux","228 - LX - KC - Linha de comando do Linux",
    "Usuários e grupos do Linux","229 - Lab - Usuários e grupos","230 - LX - KC - Usuários e grupos",
    "Editar arquivos no Linux","231 - Lab - Editar arquivos","232 - LX - KC - Editar arquivos",
    "Trabalhar com o sistema de arquivos do Linux","233 - Lab - Trabalhar com o sistema de arquivos","234 - LX - KC - Trabalhar com o sistema de arquivos",
    "Trabalhar com arquivos no Linux","235 - Lab - Trabalhar com arquivos no Linux","236 - LX - KC - Trabalhar com arquivos",
    "Gerenciar permissões de arquivo do Linux","237 - Lab - Gerenciar permissões de arquivo","238 - LX - KC - Gerenciar permissões de arquivo",
    "Gerenciar processos do Linux","239 - Lab - Gerenciar processos","240 - LX - KC - Gerenciar processos",
    "Gerenciar serviços do Linux","241 - Lab - Gerenciar serviços","242 - LX - KC - Gerenciar serviços",
    "Gerenciamento de software","243 - Lab - Gerenciamento de software","244 - LX - KC - Gerenciamento de software",
    "Gerenciar arquivos de log","245 - Lab - Gerenciar arquivos de log","246 - LX - KC - Gerenciar arquivos de log",
    "Trabalhar com comandos do Linux","247 - Lab - Trabalhar com comandos","248 - LX - KC - Trabalhar com comandos",
    "Shell Bash do Linux","249 - Lab - Shell Bash","250 - LX - KC - O Shell Bash",
    "Scripts do Shell Bash do Linux","251 - Lab - Scripts de shell do Bash","252 - LX - KC - Scripts de shell do Bash",
    "253 - Lab - [Desafio] desenvolvimento de scripts em Shell Bash","Perspectiva profissional","Pronto para obter a certificação da AWS? - 3"
  ]},
  {n:"Redes", items:[
    "Introdução à rede","254 - NF - KC - Introdução à rede","Conceitos de rede","255 - NF - KC - Conceitos de rede",
    "Protocolo de Internet (IP)","256 - NF - KC - Protocolo de Internet (IP)","261 - Lab - Endereços IP públicos e privados",
    "262 - NF - Lab - Endereços estáticos e dinâmicos e IP","Redes na Nuvem AWS","257 - NF - KC - Amazon VPC",
    "263 - Lab - Criar sub-redes em uma VPC","264 - Lab - Recursos de rede para uma VPC","Inteligência emocional","Sub-rede IP",
    "258 - NF - KC - Sub-redes IPv4","Princípios de liderança | Aprender e ser curioso",
    "265 - Lab - Comandos de solução de problemas de protocolo da Internet","266 - Lab - Solucionar problemas de rede",
    "Protocolos de rede adicionais","259 - NF - KC - TCP e UDP","267 - Lab - Criar a sua VPC e iniciar um servidor Web",
    "Tecnologias de rede adicionais","260 - NF - KC - Tecnologias de rede adicionais"
  ]},
  {n:"Introdução à segurança", items:[
    "Resumo de presença digital","Configurações de entrevistas","Processo de entrevista","Simulação de perguntas de entrevista",
    "Presença digital","Introdução à segurança","Exemplo de política de uso aceitável","282 - SF - KC - Introdução à segurança",
    "Ciclo de vida da segurança: Prevenção","283 - SF - KC - Ciclo de vida da segurança: Prevenção","Prevenção: Reforço da rede",
    "276 - Lab - Endurecimento da rede","284 - SF - KC - Reforço da rede","Prevenção: Reforço dos sistemas",
    "277 - SF - Lab - Endurecimento de Sistemas","285 - SF - KC - Reforço dos sistemas","Prevenção: Segurança de dados",
    "278 - SF - Lab - Proteção de dados usando criptografia","286 - SF - KC - Prevenção: Segurança de dados",
    "Prevenção: Infraestrutura de chave pública","Demonstração do Amazon Certificate Manager (ACM)","287 - SF - KC - Prevenção: PKI",
    "Prevenção: Gerenciamento de identidades","288 - SF - KC - Prevenção: Gerenciamento de identidades",
    "Prevenção: AWS Identity and Access Management","279 - SF - Lab - Introdução ao gerenciamento de identidade e acesso (IAM)",
    "289 - SF - KC - Prevenção: AWS IAM","Detecção","280 - SF - Lab - Firewall Malware","290 - SF - KC - Ciclo de vida da segurança: Detecção",
    "AWS CloudTrail","291 - SF - KC - AWS CloudTrail","AWS Config","292 - SF - KC - AWS Config","Resposta",
    "293 - SF - KC - Ciclo de vida da segurança: Resposta","Análise","281 - SF - Lab - Monitorar uma instância do EC2",
    "294 - SF - KC - Ciclo de vida da segurança: Análise","AWS Trusted Advisor","Princípios de liderança | Ganhar a confiança",
    "295 - SF - KC - Trusted Advisor","Práticas recomendadas de segurança","296 - SF - KC - Práticas recomendadas de segurança para a criação de conta",
    "Conformidade de segurança da AWS","297 - SF - KC - Programa de conformidade de segurança da AWS","Recursos de segurança da AWS",
    "298 - SF - KC - Recursos de segurança da AWS","Simulação de perguntas de entrevista","Processo de contratação",
    "Atualizar seu perfil do LinkedIn com a experiência do AWS re/Start"
  ]},
  {n:"Programação Python", items:[
    "Introdução à programação em Python (partes 1 a 4)","108 - PF - Lab - Olá mundo","109 - PF - Lab - Tipos de dados numéricos",
    "110 - PF - Lab - Tipo de dados de string","111 - PF - Lab - Lista, tupla, dicionário","112 - PF - Lab - Categorizar valores",
    "113 - PF - Lab - Tipos de dados compostos","114 - PF - Lab - Condicionais","115 - PF - Lab - Loops","116 - PF - Lab - Cria um repositório git",
    "Programação em Python","117 - PF - KC - Introdução à Programação","118 - PF - Lab - Preparando-se para analisar insulina com Python",
    "119 - PF - Lab - Introdução ao Python","120 - PF - Lab - Sequência de cordas e peso numérico da insulina","121 - PF - KC - Fundamentos do Python",
    "Conceitos básicos de programação em Python","Controle de fluxo do Python",
    "122 - PF - Lab - Calculando a carga líquida de insulina usando listas e loops Python","123 - PF - KC - Controle de fluxo",
    "Funções de programação em Python","124 - PF - Lab - Use funções para implementar uma cifra de César","125 - PF - KC - Funções",
    "Módulos e bibliotecas de Python","126 - PF - Lab - Manipuladores de arquivos e módulos para recuperar informações sobre insulina",
    "127 - PF - KC - Módulos e Bibliotecas","Administração do sistema de Python","128 - PF - Lab - Administração do sistema com Python",
    "223 - PF - KC - Python para administração do sistema","Depuração e teste","129 - PF - Lab - Usando o depurador",
    "130 - PF - Lab - Depurando Hello World e Caesar Cipher","131 - PF - KC - Depuração e teste","134 - Lab - Avaliar uma ferramenta de DevOps",
    "135 - PF - Lab - Explore o valor da automação","DevOps de Python e integração contínua","136 - Lab - Compare e contraste automação e orquestração",
    "137 - PF - Lab - DevOps e integração contínua","Gerenciamento de configuração do Python","138 - PF - Lab - Gerenciamento de configuração",
    "141 - Lab - [Desafio] Exercício Python","Descoberta de fatos","O que vem depois do AWS re/Start?"
  ]},
  {n:"Bases de dados", items:[
    "Introdução aos bancos de dados","Atividade: Introdução aos bancos de dados","299 - DF - KC - Introdução aos bancos de dados",
    "Interação com dados e transação de banco de dados","300 - DF - KC - Interação com dados e transação de banco de dados",
    "Criar tabelas e conhecer os tipos diferentes de dados","Atividade: Criar tabelas e tipos de dados",
    "268 - Lab - Operações de tabela de banco de dados","301 - DF - KC - Criar tabelas e conhecer os tipos diferentes de dados",
    "Simulação de perguntas de entrevista","Inserir dados em um banco de dados","269 - Lab - Inserir, atualizar e excluir dados em um banco de dados",
    "302 - DF - KC - Inserir dados","Selecionar dados","270 - Lab - Selecionando dados de um banco de dados",
    "303 - DF - KC - Selecionando Dados de um Banco de Dados","Criação de currículo","Orientações para o currículo","Transações e tabelas",
    "Realizar uma pesquisa condicional","271 - Lab - Executando uma pesquisa condicional","304 - DF - KC - Realizar uma pesquisa condicional",
    "Trabalhar com funções","272 - Lab - Trabalhando com funções","305 - DF - KC - Trabalhar com funções","Organizar dados",
    "273 - Lab - Organização de dados","306 - DF - KC - Organizar dados","Recuperar dados",
    "160 - Lab - Crie seu servidor de banco de dados e interaja com seu banco de dados usando um aplicativo","307 - DF - KC - Recuperar dados",
    "Amazon RDS","Demonstração do Amazon RDS","274 - Lab - Introdução a Amazon Aurora","308 - DF - KC - Amazon RDS","Amazon DynamoDB",
    "Demonstração do Dynamo DB","275 - Lab - Introdução a Amazon DynamoDB","309 - DF - KC - Amazon DynamoDB","Descoberta de fatos",
    "162 - Lab - [Desafio] Criar e acessar um servidor RDS","Tópicos avançados sobre bancos de dados","Orientações para o currículo",
    "Habilidades de rede","Simulação de perguntas de entrevista"
  ]},
  {n:"Arquitetura AWS", items:[
    "Visão geral da arquitetura AWS","AWS Cloud Adoption Framework","Marco de AWS Well-Architected","Design do Well-Architected",
    "Confiabilidade e alta disponibilidade","Transição de um data center para a nuvem","167 - JAWS - KC - Well-Architected Framework",
    "Processos do pensamento técnico","Trabalho em equipe e colaboração"
  ]},
  {n:"Operações do sistema", items:[
    "Informação geral sobre as operações de sistemas","Operações do sistema na AWS","Compreendendo as operações de sistemas na AWS",
    "Criação de uma base de conhecimento para resolução de problemas","Planilha da base de conhecimento",
    "Projeto: Base de conhecimento de solução de problemas","AWS Identity and Access Management","AWS Command Line Interface",
    "Visão geral da atividade do café: Instância e uso da CLI da AWS","168 - Lab - Instalar e configurar a CLI da AWS",
    "210 - JAWS - KC - Visão geral das operações do sistema"
  ]},
  {n:"Ferramentas e Automação", items:[
    "Visão geral sobre as ferramentas e a automação","AWS Systems Manager","169 - Lab - Usar o AWS Systems Manager",
    "Ferramentas de administração","211 - JAWS - KC - Ferramentas e automação"
  ]},
  {n:"Servidores", items:[
    "Visão geral sobre os servidores","Hospedar um site estático no Amazon S3","Criar um site no Amazon S3","170 - Lab - Criar um site no S3",
    "Computação na AWS","Gerenciar instâncias do EC2 da AWS","171 - Lab - Criando instâncias do Amazon EC2",
    "172 - Lab - [Desafio] Exercício de instância do EC2","212 - JAWS - KC - Computação (servidores)","AWS Elastic Beanstalk",
    "Solucionar problemas na criação de uma instância do EC2","173 - Lab - Solucionar problemas para criar uma instância"
  ]},
  {n:"Escala e resolução de nomes", items:[
    "Visão geral sobre o scaling e a resolução de nomes","Elastic Load Balancing","Balanceadores de carga e ouvintes do ELB",
    "174 - Lab - Dimensionar e balancear a carga da arquitetura","175 - Lab - Usar o Auto Scaling na AWS (Linux)","Amazon EC2 Auto Scaling",
    "Desafio de previsão de auto scaling","Amazon Route 53","Amazon CloudFront","Roteamento por failover do Amazon Route 53",
    "176 - Lab - Roteamento de failover do Route 53","213 - JAWS - KC - Computação (dimensionamento e resolução de nomes)"
  ]},
  {n:"Tecnologia sem servidor e contêineres", items:[
    "Visão geral sobre a tecnologia sem servidor e os contêineres","AWS Lambda","Trabalhar com o AWS Lambda","178 - Lab - Trabalhar com o AWS Lambda",
    "177 - Lab - [Desafio] Exercício do AWS Lambda","APIs e REST","Amazon API Gateway","AWS Step Functions","Contêineres na AWS",
    "214 - JAWS - KC - Computação (contêineres)"
  ]},
  {n:"Serviços de banco de dados da AWS", items:[
    "Visão geral sobre os serviços de banco de dados da AWS","Introdução aos bancos de dados na AWS","Amazon Redshift","Amazon Aurora",
    "AWS DMS","Migração para o Amazon RDS","179 - Lab - Migrar para o Amazon RDS","215 - JAWS - KC - Computação (bancos de dados)"
  ]},
  {n:"Serviços de redes da AWS", items:[
    "Visão geral sobre os serviços de redes da AWS","Amazon VPC","Opções de conectividade da VPC","Segurança e solução de problemas da rede",
    "180 - Lab - Configurar uma Amazon VPC","Solução de problemas em uma VPC","181 - Lab - Solucionar problemas de uma VPC",
    "216 - KC - Serviços de rede AWS"
  ]},
  {n:"Armazenamento e arquivamento", items:[
    "Visão geral sobre o armazenamento e o arquivamento","Visão geral sobre o armazenamento na nuvem","Amazon EBS","182 - Lab - Trabalhar com o Amazon EBS",
    "Armazenamento de instâncias","Amazon EFS","Armazenamento com o Amazon S3","Amazon S3 Glacier","183 - Lab - Gerenciar o armazenamento",
    "AWS Storage Gateway","Trabalhar com o Amazon S3","184 - Lab - [Desafio] Exercício de S3","185 - Lab - Trabalhar com o Amazon S3",
    "AWS Transfer Family e outros serviços de migração","217 - JAWS - KC - Armazenamento e arquivamento"
  ]},
  {n:"Monitoramento e Segurança", items:[
    "Visão geral de monitoramento e segurança","Amazon CloudWatch","Mergulhe fundo: Amazon CloudWatch",
    "Visão geral do laboratório: Monitorar aplicações e a infraestrutura","186 - Lab - Monitorar a infraestrutura","AWS CloudTrail",
    "Integração de serviço da AWS com o Athena","187 - Lab - Trabalhar com o AWS CloudTrail","218 - JAWS - KC - Monitoramento e segurança"
  ]},
  {n:"Gerenciando e consumo de recursos", items:[
    "Visão geral do gerenciamento do consumo de recursos","AWS Organizations","Marcação","188 - Lab - Gerenciar recursos com marcação",
    "Gerenciamento de custos da AWS e práticas recomendadas","Demonstração do painel de faturamento da AWS-2","Serviços do AWS Support",
    "Gerenciamento do consumo de recursos: Otimizar a utilização de recursos da AWS","189 - Lab - Otimizar a utilização",
    "219 - JAWS - KC - Gerenciando o consumo de recursos"
  ]},
  {n:"Implantação automática e repetitiva", items:[
    "Simulação de perguntas de entrevista","Gerenciamento de configurações na nuvem","Estratégia de construção da AMI",
    "Modelos de inicialização do Amazon EC2","Demonstração do modelo de lançamento EC2-2","Infraestrutura como código",
    "Introdução ao JSON e ao YAML","AWS CloudFormation","Automatizar implantações com o AWS CloudFormation",
    "190 - Lab - Automatização de implantações com o AWS CloudFormation","Solucionar problemas do AWS CloudFormation",
    "Introdução à atividade do café: Criar implantações automatizadas e repetíveis",
    "191 - Lab - Solucionar problemas de implantações do AWS CloudFormation","220 - JAWS - KC - Criando implantações repetíveis automatizadas",
    "192 - Lab - [Desafio] CloudFormation"
  ]},
  {n:"Habilidades avançadas da AWS: Inteligência Artificial", items:[
    "Fundamentals of Machine Learning and Artificial Intelligence (Português)","Discussão - Uso de ML e IA",
    "Exploring Artificial Intelligence Use Cases and Applications (Português)","Discussão - Introdução ao portfólio",
    "O Portfólio - Um exercício de exploração da Inteligência Artificial","Responsible Artificial Intelligence Practices (Português)",
    "Discussão - Serviços e Ferramentas de IA","Developing Machine Learning Solutions (Português)","Discussão - Métodos para um modelo de produção",
    "Developing Generative Artificial Intelligence Solutions (Português)","O Portfólio - Trabalho Contínuo","Optimizing Foundation Models (Português)",
    "Discussão - Modelos de Fundação","Security, Compliance, and Governance for AI Solutions (Português)",
    "Discussão: Serviços da AWS para proteger sistemas de IA","AWS SimuLearn: Create an AI Smart Assistant","Essentials of Prompt Engineering (Português)",
    "Discussão: Engenharia de Prompt de IA","No-code Machine Learning and Generative AI on AWS (Português)","O Portfólio - Trabalho Contínuo 3"
  ]},
  {n:"Generative AI for Developers", items:[
    "Introduction to Generative AI - Art of the Possible (Português)","Planning a Generative AI Project (Português)",
    "Discussão: Progresso do Portfólio Usando IA Generativa","Amazon Bedrock Getting Started (Português)","Foundations of Prompt Engineering (Português)",
    "Building Generative AI Applications Using Amazon Bedrock (Português)","Amazon Q Developer Getting Started (Português)",
    "316 - AI - Lab - Amazon SageMaker - Training a machine-learning model","Discussão: Progresso do Portfólio","Finalizar Portfólio",
    "Pesquisa de avaliação pós-coorte do AWS re/Start v1.1"
  ]},
  {n:"Preparação para exames", items:[
    "Perguntas simuladas da entrevista","Cloud Adoption Framework (CAF)","Tópicos adicionais da AWS","Trends in Cloud Computing",
    "AWS Certified Cloud Practitioner Exam Preparation","AWS Skills Builder","195 - CERT - KC - Preparação da Certificação do Cenário de Avaliação",
    "196 - CERT - KC - Prática de estratégia de teste de cenário","197 - CERT - KC - Computação em nuvem","198 - CERT - KC - Economia da nuvem",
    "199 - CERT - KC - Infraestrutura global da AWS","200 - CERT - KC - Compute","201 - CERT - KC - Gerenciamento de identidade e acesso (IAM)",
    "202 - CERT - KC - Amazon Virtual Private Cloud (VPC)","203 - CERT - KC - Armazenamento","204 - CERT - KC - Bancos de dados",
    "205 - CERT - KC - Cobrança e suporte","206 - CERT - KC - Arquitetura em nuvem","207 - CERT - KC - Balanceamento - Dimensionamento - Monitoramento",
    "Parabéns, você conseguiu passar pelo AWS re/Start!"
  ]}
];

MODULES.forEach(m => m.slug = slug(m.n));

export const TOTAL = MODULES.reduce((a,m)=>a+m.items.length, 0);

export function keyOf(m, ii){ return m.slug + "__" + ii; }

// Classifica o tipo do assunto pelo título (Lab, KC, Certificação, etc.)
export function classify(t){
  if(/parab[ée]ns/i.test(t)) return {c:"port", l:"Marco"};
  if(/\bLab\b/i.test(t)) return {c:"lab", l:"Lab"};
  if(/CERT\s*-\s*KC/i.test(t)) return {c:"cert", l:"Certificação"};
  if(/\bKC\b/i.test(t)) return {c:"check", l:"Knowledge Check"};
  if(/^Discuss[ãa]o/i.test(t)) return {c:"disc", l:"Discussão"};
  if(/Portf[óo]lio/i.test(t)) return {c:"port", l:"Portfólio"};
  return null;
}

// Separa o código numérico ("170 - ") do resto do título
export function splitNum(t){
  const m = t.match(/^(\d{1,3}\s*-\s*)(.*)$/);
  return m ? {num:m[1], rest:m[2]} : {num:"", rest:t};
}
