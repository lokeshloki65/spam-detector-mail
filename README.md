 spam detector- mail

This project utilizes a modern, full-stack architecture:

* **Frontend:** React, Tailwind CSS, Framer Motion (for animations)
* **Backend:** Python (FastAPI)
* **Database & Auth:** Firebase (Cloud Firestore & Firebase Authentication)
* **Machine Learning:** Scikit-learn / Hugging Face Transformers

## How to Run Locally

1.  **Clone the repository:**
    ```sh
    git clone [your-repository-url]
    cd aegis-spam-detector
    ```

2.  **Install Frontend Dependencies:**
    ```sh
    # Navigate to the frontend directory
    cd frontend
    npm install
    ```

3.  **Install Backend Dependencies:**
    ```sh
    # Navigate to the backend directory
    cd backend
    pip install -r requirements.txt
    ```

4.  **Set up Environment Variables:**
    * Create a `.env` file in both the `frontend` and `backend` directories.
    * Add your Firebase project configuration keys and any other required API keys.

5.  **Run the Application:**
    * **Frontend:** `npm run dev`
    * **Backend:** `uvicorn main:app --reload` 
