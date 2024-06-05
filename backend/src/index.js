const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const searchRoutes = require('./routes/search');

const organizationForAuthRoutes = require('./routes/organizationLogin');

const openaiRoutes = require('./routes/openai');

const usersRoutes = require('./routes/users');

const appointmentsRoutes = require('./routes/appointments');

const clientsRoutes = require('./routes/clients');

const coursesRoutes = require('./routes/courses');

const ebooksRoutes = require('./routes/ebooks');

const meal_plansRoutes = require('./routes/meal_plans');

const nutritionistsRoutes = require('./routes/nutritionists');

const patient_recordsRoutes = require('./routes/patient_records');

const programsRoutes = require('./routes/programs');

const recipesRoutes = require('./routes/recipes');

const diet_restrictionsRoutes = require('./routes/diet_restrictions');

const rolesRoutes = require('./routes/roles');

const permissionsRoutes = require('./routes/permissions');

const companiesRoutes = require('./routes/companies');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Create a backend for a dietician to create meal pl',
      description:
        'Create a backend for a dietician to create meal pl Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.enable('trust proxy');

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/appointments',
  passport.authenticate('jwt', { session: false }),
  appointmentsRoutes,
);

app.use(
  '/api/clients',
  passport.authenticate('jwt', { session: false }),
  clientsRoutes,
);

app.use(
  '/api/courses',
  passport.authenticate('jwt', { session: false }),
  coursesRoutes,
);

app.use(
  '/api/ebooks',
  passport.authenticate('jwt', { session: false }),
  ebooksRoutes,
);

app.use(
  '/api/meal_plans',
  passport.authenticate('jwt', { session: false }),
  meal_plansRoutes,
);

app.use(
  '/api/nutritionists',
  passport.authenticate('jwt', { session: false }),
  nutritionistsRoutes,
);

app.use(
  '/api/patient_records',
  passport.authenticate('jwt', { session: false }),
  patient_recordsRoutes,
);

app.use(
  '/api/programs',
  passport.authenticate('jwt', { session: false }),
  programsRoutes,
);

app.use(
  '/api/recipes',
  passport.authenticate('jwt', { session: false }),
  recipesRoutes,
);

app.use(
  '/api/diet_restrictions',
  passport.authenticate('jwt', { session: false }),
  diet_restrictionsRoutes,
);

app.use(
  '/api/roles',
  passport.authenticate('jwt', { session: false }),
  rolesRoutes,
);

app.use(
  '/api/permissions',
  passport.authenticate('jwt', { session: false }),
  permissionsRoutes,
);

app.use(
  '/api/companies',
  passport.authenticate('jwt', { session: false }),
  companiesRoutes,
);

app.use(
  '/api/openai',
  passport.authenticate('jwt', { session: false }),
  openaiRoutes,
);

app.use(
  '/api/search',
  passport.authenticate('jwt', { session: false }),
  searchRoutes,
);

app.use('/api/org-for-auth', organizationForAuthRoutes);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
