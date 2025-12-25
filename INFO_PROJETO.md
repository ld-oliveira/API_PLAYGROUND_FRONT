lembrar de criar um repositorio separado para esse arquivo.

# 🧭 Informações do Projeto – API_PLAYGROUND

## 🔍 Visão Geral

**API_PLAYGROUND** é um projeto pessoal de testes e aprendizado em desenvolvimento web full stack.  
Ele serve como ambiente de integração entre **React (front-end)** e **Django REST Framework (back-end)**, explorando autenticação, CORS, manipulação de imagens, APIs externas e deploys em nuvem (Render e Vercel).

---

## 🌐 Hospedagem e Infraestrutura

### Front-end

- **Framework:** React (JSX + Sass)
- **Hospedagem:** [Vercel](https://vercel.com)
- **URL de produção:** [https://ld-oliveira.com](https://ld-oliveira.com)
- **Branch vinculada:** `main`
- **Deploy automático:** sim (Vercel Git Integration)

### Back-end

- **Framework:** Django REST Framework
- **Hospedagem:** [Render](https://render.com)
- **URL base:** https://api-playground-back.onrender.com
- **Banco de dados:** PostgreSQL (Render)
- **Admin Django:** `/admin/`
- **Media uploads:** `/media/`
- **Repositório Git:** GitHub (branch `main`)

---

## 🌍 Domínio e DNS

| Item                    | Valor                                   |
| ----------------------- | --------------------------------------- |
| **Domínio principal**   | ld-oliveira.com                         |
| **Provedor de domínio** | Hostinger                               |
| **DNS atual**           | Cloudflare                              |
| **Subdomínios**         | `api.ld-oliveira.com → Render`          |
| **SSL**                 | Ativado via Cloudflare                  |
| **Redirecionamentos**   | `www.ld-oliveira.com → ld-oliveira.com` |

---

## 🔐 Variáveis de Ambiente

### Front-end `.env`
