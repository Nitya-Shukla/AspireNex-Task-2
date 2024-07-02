# eCommerce Scraper

This project is an eCommerce scraper built with Next.js. It scrapes product data from given URLs, processes the data using Tesseract for OCR, and summarizes it using ChatGPT.

## Table of Contents
- [eCommerce Scraper](#ecommerce-scraper)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
  - [Usage](#usage)
  - [API](#api)

## Features

- Scrape product data from eCommerce websites.
- Use Tesseract for Optical Character Recognition (OCR) to extract text from screenshots.
- Summarize extracted text using ChatGPT.
- Display scraped and summarized data in a user-friendly interface.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ecommerce-scraper.git
   cd ecommerce-scraper
   ```
2. **Install dependencies:**

```bash

npm install
```
or

```bash

yarn install
```
## Running the Project

1. **Start the development server:**

```bash

npm run dev
```
or

```bash

yarn dev
```
2. **Open your browser and go to:**

```arduino

    http://localhost:3000
```
## Usage

  1. Enter a product URL in the input field and click "Scrape".
  2. The application will scrape the product data, process it, and display the results.

## API

The API endpoint for scraping data is /api/scrape.

Method: POST

Body: JSON containing the URL to be scraped.

```json

{
  "url": "https://example.com/product"
}
```
Response: JSON containing the scraped and summarized data.

```json

    {
      "data": "..."
    }

```

