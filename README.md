# AWS re/Start · Acompanhamento da turma (BRSAO237)

Aplicação web para a turma do **AWS re/Start** acompanhar o andamento das aulas e reunir, num lugar só, os links e anotações que aparecem ao longo do curso.

## A ideia

Durante o curso, muita dica e link acaba se perdendo no meio das conversas, e fica difícil saber o que já foi visto e o que ainda falta. Este projeto junta duas coisas:

- um **mapa do andamento** das aulas — o que já foi passado, a última aula e o que ainda vem;
- um **caderno compartilhado** da turma — com as anotações e links de cada aula.

Não é ferramenta de cobrança: cada um faz no seu ritmo. O objetivo é **dar visibilidade** ao andamento e **centralizar o material**.

## Como funciona

- **Diário de aulas** — cada aula tem data, título e anotações/links, e recebe os assuntos passados nela. O progresso vem daí: assunto sem aula é *próximo*, na aula mais recente é *última aula*, em aulas anteriores é *concluído*.
- **Comentários** — qualquer um comenta, sem conta, numa aula específica ou no mural geral.
- **Edição** — só o mantenedor (com login) mexe nas aulas e no progresso; o resto da turma vê e comenta.
- **Ao vivo** — tudo fica num banco compartilhado e atualiza sozinho.

## Tecnologia

Front-end estático em **HTML + CSS + JavaScript** (módulos ES, sem framework) e back-end no **Supabase** (Postgres + Auth + Realtime). Organizado por responsabilidade:

```
index.html          markup
css/styles.css      estilos
js/config.js        credenciais do Supabase
js/data.js          dados do curso (módulos/assuntos)
js/utils.js         formatação (datas, links, escape)
js/store.js         estado + regras de status
js/api.js           Supabase (login, dados, tempo real)
js/ui.js            telas, modais, ações
js/main.js          inicialização
schema.sql          tabelas + regras de acesso
```

---

Feito para a turma **BRSAO237** do AWS re/Start.