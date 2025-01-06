
# Help Book

Welcome to **Help Book**, a project designed to provide a comprehensive solution for managing resources and tools online. This project includes both a web application and backend integration to offer a seamless experience.

---

## **Website**

The website is live and accessible at:
[https://help-book.netlify.app/](https://help-book.netlify.app/)

This site offers a user-friendly interface to manage and access resources.

---

## **Repository**

The source code for this project is hosted on GitHub:
[https://github.com/MishaStryzhka/help-book](https://github.com/MishaStryzhka/help-book)

Feel free to explore, contribute, or raise issues if you find any.

---

## **Features**

### Website Features

- User-friendly interface with intuitive navigation.
- Responsive design for desktop and mobile users.
- Dynamic data display to ensure updated information.

### Backend Integration

- Firebase Cloud Functions for backend logic.
- Real-time database updates using Firestore.
- Authentication support for secured user access.

---

## **Setup Instructions**

### Prerequisites

- Node.js installed on your system.
- Firebase CLI installed globally.

### Clone the Repository

```bash
git clone https://github.com/MishaStryzhka/help-book.git
cd help-book
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

For the frontend:

```bash
npm start
```

Navigate to `http://localhost:3000` in your browser.

For the backend, set up Firebase functions:

```bash
cd functions
npm install
firebase emulators:start
```

---

## **Deployment**

### Deploy Frontend

The frontend is hosted on Netlify. To deploy updates:

1. Push your changes to the GitHub repository.
2. Netlify will automatically trigger a deployment.

### Deploy Backend

The backend uses Firebase Cloud Functions. To deploy:

```bash
firebase deploy --only functions
```

---

## **Technologies Used**

### Frontend

- React.js
- CSS Modules
- Chakra UI
- Netlify for hosting

### Backend

- Firebase Cloud Functions
- Firestore Database
- Firebase Authentication

---

## **Contributing**

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to your branch:
   ```bash
   git commit -m "Description of your changes"
   git push origin feature-name
   ```
4. Open a Pull Request on GitHub.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](https://github.com/MishaStryzhka/help-book/blob/main/LICENSE) file for details.

---

## **Contact**

If you have any questions or feedback, feel free to contact:

- **Author**: [Misha Stryzhka](https://github.com/MishaStryzhka)

---

Thank you for using Help Book! We hope you find it useful and easy to navigate.
