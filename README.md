# To Do App - Arquitetura MVC com React

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

> Uma aplicação de gerenciamento de tarefas focada em **Arquitetura de Software**, **Clean Code** e **UI/UX refinada**.

## 🎨 Preview

![Demo da Aplicação](./public/demo.gif)

## 📖 Sobre o Projeto

Este projeto foi desenvolvido como parte de um estudo de Engenharia de Software (IFCE 2025.2) para comparar arquiteturas de frontend. O objetivo principal foi implementar o padrão **MVC (Model-View-Controller)** em React, garantindo uma estrita separação de responsabilidades.

Este projeto tem como pontos de destaque:
* **Separação Arquitetural:** A View é "burra", apenas exibindo dados do **Model** e enviando comandos pro **Controller**.
* **Design:** Busca pela implementação de uma interface agradável visualmente.
* **Simplicidade:** Se mantém no escopo de um trabalho acadêmico simples, sem preocupações elevadas com escalabilidade, performance, segurança e outros detalhes.


## 🚀 Como Rodar

1.  Clone o repositório.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Rode o projeto:
    ```bash
    npm run dev
    ```

## ✨ Funcionalidades

* ✅ **CRUD Completo:** Criar, Ler, Atualizar e Deletar tarefas.
* ✋ **Drag and Drop Nativo:** Reordenação de tarefas com feedback visual.
* 🌙 **Dark/Light Mode:** Tema persistente com variáveis CSS nativas.
* 🔍 **Filtros:** Alternar visualização entre todas as tarefas ou pendentes.
* 🔔 **Feedback Visual:** Sistema de Toasts (notificações) para sucesso e erro.
* 📱 **Responsivo:** Layout fluido que se adapta a diferentes tamanhos de tela.

## 🏗️ Arquitetura (MVC)

A estrutura de código reflete a separação de responsabilidades do padrão MVC:

```text
src/
├── hooks/           # Hooks globais (ex: useTheme)
├── models/          # Interfaces (Task.ts) - O formato dos dados
├── services/        # Lógica de API/Persistência (local_api.ts) - A origem dos dados
├── pages/
    └── to-do/
        ├── ToDoPage.tsx          # View (Interface Gráfica)
        └── useToDoController.ts  # Controller (Regra lógica e orquestração)
```

### 🧩 Papéis na Implementação:

1.  **Model (Dados):**
    *   Representado pelas interfaces (`Task`) e pelo estado bruto gerenciado (`tasks`, `newTaskText`).
    *   Não sabe como será exibido na tela.
    *   Não sabe como o usuário interage (clique, teclado).

2.  **View (ToDoPage.tsx):**
    *   Recebe o `model` do Controller e o desenha na tela.
    *   Não decide nada sozinha (ex: não decide se pode apagar uma tarefa, ela pede ao Controller).
    *   Conceitualmente, ela "observa" o Model (no React, isso acontece via re-renderização quando o estado muda).

3.  **Controller (useToDoController.ts):**
    *   A ponte entre o usuário e o sistema.
    *   Recebe os eventos da View (ex: `handleAddTask`, `handleRemoveTask`).
    *   Processa a lógica de negócio (chama a API, valida input).
    *   Atualiza o Model, o que causa a atualização da View.

---

*Desenvolvido para a disciplina de Engenharia de Software - IFCE*
