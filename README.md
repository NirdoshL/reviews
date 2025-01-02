# GOOGLE REVIEWS APP

## Introduction

Thank you for choosing **GOOGLE REVIEWS APP**, the comprehensive Google Reviews store and provider app meticulously crafted with MongoDb and Node.js, along with Nest js as the frontend control.

**GOOGLE REVIEWS APP** is exclusively designed for DeltaVLogics, ensuring a personalized and secure experience tailored to the company’s business needs.

## Getting Started

**GOOGLE REVIEWS APP** simplifies the process of managing and accessing Google Reviews for registered restaurants. Through the intuitive interface, you can effortlessly add restaurant names and their corresponding Google Review links. The app then fetches and stores these reviews, making them readily available whenever needed.

### Adding Restaurant Information:

1. Navigate to the **GOOGLE REVIEWS APP**.
2. Sign up using your credentials (Company email).
3. A verification email will be sent to the admin email (not to the registered user).
4. Once the admin verifies you as a user, log in using your credentials.
5. Access the designated section for adding restaurant details.
6. Enter the restaurant name and its corresponding Google Review link.
7. Submit the information to initiate the review-fetching process.
8. Delete restaurants by pressing the delete button in the restaurant management table.

### Retrieving Reviews:

To retrieve reviews for a specific restaurant:

1. Utilize the endpoint: `/reviews/:id` in your application.
2. Replace `:id` with the unique identifier or code assigned to the restaurant.
3. **GOOGLE REVIEWS APP** will provide the stored Google Reviews for the specified restaurant.

## Important Paths

1. **Sign-Up:** `/register`
2. **Log-In:** `/login`
3. **Admin Dashboard:** `/dvls/dashboard`
4. **Review Read:** `/reviews/:id`

---

Thank you for choosing **GOOGLE REVIEWS APP** - where managing Google Reviews for restaurants is efficient, secure, and tailored to the unique needs of DeltaVlogics.
