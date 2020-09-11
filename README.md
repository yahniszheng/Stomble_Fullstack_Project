# Stomble_Fullstack_Project


## Requirement:
1. Code the frontend in the react framework.
2. Use Material UI.
3. Use Python for the backend.
4. Upload your task to GIT. 
5. MongoDB for database storage
6. Redux for state management controls
7. GraphQL for API endpoints.
8. Upload to AWS.


## Overview:
Purpose: The web application and public API can view details of disease outbreak reports which are extracted and analyzed from multiple news articles.

Implementataion: There are three phases of this project, backend web-crawling & cloud MongoDb, GraphQL API and Front-end web application.

Workflow: In backend web-crawling & cloud MongoDb phase, Scrappy will do web crawling for multiple news websites to gather contents of disease outbreak news. These outbreak contents will go though Natural Language Processer to generate Outbreak Reports. The Reports will be upload to MongoDb. In GraphQL API phase, GraphQL API will take queries and fetch related data from MongoDb. In Front-end phase, Web application will fetch data from API and use react framework, material UI to represent them in a intuitive way.
