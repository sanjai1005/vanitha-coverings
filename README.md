# Vanitha Coverings (வணிதா கவரிங்ஸ்) - Covering Jewels E-Commerce & Requirement Matching

An elegant, fully-featured premium web application for **Vanitha Coverings** built with **React.js (Vite)**, **Spring Boot 3 (Java 17)**, and **MySQL 8.0**.

This platform is specialized for covering, aimpone/five-metal and foam jewellery products. It supports dual-language navigation (English & Tamil), a custom chatbot which matches user requirements (including sketch/reference images) directly to the owner/admin dashboard, and a simulation-ready transactional mock card/UPI QR code payment gateway.

---

## 🛠️ Technology Stack

1. **Frontend**: React.js 19, Vite 5, Lucide-React (Icons), Vanilla CSS (Custom traditional South Indian Royal Maroon & Golden luxury Theme)
2. **Backend**: Spring Boot 3.2.5 (Java 17), Spring Data JPA, Hibernate, Tomcat Web Server
3. **Database**: MySQL 8.0+
4. **Security & Cryptography**: BCrypt (mindrot) for password hashing

---

## 🌟 Key Features

* **Dual-Language Interoperability**: Click the `EN | தமிழ்` glob button in the top-right header to translate the entire user interface and categories.
* **Granular Collections Directory**: Includes the complete category hierarchy requested:
  * Chains (Baby Chains, Long Chains)
  * Attigai (Aimpone Attigai, Single-Stone Attigai)
  * Aaram / Necklaces (Aimpone, Covering, Foam Sets)
  * Rings, Kamal Sets, Bangles (Aimpone Bangles)
  * Ear Jewellery (Ear Hoops, Flower Studs, Danglers, Foam Danglers)
  * Nethichutti, Nose Pins, Bridal Jewellery Sets, Foam Jewellery
* **Strict Register & Hybrid Login**: 
  * Registration guards against duplicate usernames.
  * Hashed password storage with BCrypt.
  * Login is flexible: supports logging in using `Username + Password` OR `Phone Number + Password`.
  * **Forgot Password Recovery Option**: Prompts for security questions (set during registration) to restore access safely.
* **Owner Administration Panel**:
  * Logged-in admin owners can view customer custom requirements along with customer contact phone numbers.
  * Admin can upload new jewellery items (names, descriptions in English/Tamil, prices, subcategories, and local image uploads converted to Base64 LONGTEXT strings).
  * Edit and delete products.
* **Customer Requirement Chatbot**:
  * An interactive widget that allows customers to specify custom jewellery design requirements.
  * Supports uploading a sketch/reference image alongside a text description.
  * Tickets are sent instantly to the owner's dashboard with the user's phone number as a clickable hotlink.
* **Mock Payment Gateway Gateway**:
  * Simulate real-world payment checkouts: choose between card billing (name, number, expiry, CVV validation), UPI QR codes, or bank logins. Contains functional payment confirmation logs with transaction IDs.

---

## 🏃 Running the Application

### 1. Database Configuration
The backend connects to local schema named `vanitha_coverings`.
* User: `root`
* Password: `@Sanjai10`
The schema is automatically created. On startup, the application seeder writes:
* The Default Admin Owner: Username `admin`, Password `admin123`.
* 5 pre-populated sample showcase products to style the shopping grid immediately.

### 2. Run Spring Boot Backend
In the workspace `backend` folder:
```powershell
mvn spring-boot:run
```
* Server runs on: `http://localhost:8080`

### 3. Run React Frontend
In the workspace `frontend` folder:
```powershell
npm run dev
```
* Vite Dev Client runs on: `http://localhost:5173`

---

## 🔐 Credentials / Ready-to-Use Accounts
* **Admin Login**:
  * Username: `admin`  
  * Password: `admin123`
* **Sample Customer**: Feel free to register a new account on the register page! You can verify that usernames cannot be duplicated, and registration roles can be chosen.
