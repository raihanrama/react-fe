# Nutrition Recommendation System

A full-stack web application that provides food recommendations based on nutritional needs or BMI calculations. The system uses machine learning (KNN algorithm) to find foods that match user requirements.

## Project Structure

The project consists of two main parts:
- **Backend**: Flask-based API with machine learning model
- **Frontend**: React application with multiple pages

```
nutrition-recommendation-system/
├── backend/             
│   ├── app/            
│   ├── data/         
│   ├── models/          
│   └── run.py          
└── frontend/          
    ├── public/          
    └── src/            
        ├── components/  
        ├── pages/       
        └── services/   
```

## Features

- Food recommendations based on specific nutritional requirements
- BMI calculation and personalized food recommendations
- Food database visualization
- Responsive design for both desktop and mobile

## Prerequisites

- Python 3.7+ Recommended is 3.10
- Node.js 14+ and npm/yarn
- Git (optional, for cloning the repository)
3. Open your browser and navigate to http://localhost:3000

## Troubleshooting

### Backend Issues

- **Model file not found**: Ensure the model files are in the correct location (`backend/models/`)
- **Dataset not found**: Make sure the nutrition.csv file is in the `backend/data/` directory
- **CORS errors**: The backend has CORS enabled, but if issues persist, check your browser's security settings

### Frontend Issues

- **API connection errors**: Ensure the backend is running on port 5000
- **Dependency issues**: Try deleting the `node_modules` folder and `package-lock.json`, then run `npm install` again

## Development Notes

- The backend uses a KNN model trained on nutritional data
- Frontend API calls are configured to connect to `http://localhost:5000/api/*`
- The food list page currently uses placeholder data; in a production environment, this would be fetched from an API endpoint

## Future Improvements

- Add user authentication
- Include food image uploads
- Add more detailed nutritional information
- Implement advanced filtering options
- Add multilingual support

## License

This project is licensed under the MIT License - see the LICENSE file for details.
