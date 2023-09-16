import * as fs from 'fs';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';

export const configOpenAPI = (app: INestApplication<any>) => {
  const config = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('The OpenAPI of the Portoflio API')
    .setVersion('1.0')
    .addTag('portfolio')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (process.env.STAGE !== 'prod') {
    createOpenAPIFile(document);
  }

  SwaggerModule.setup('docs', app, document);
};

const createOpenAPIFile = (document: OpenAPIObject) => {
  const jsonDocument = JSON.stringify(document);
  const yamlDocument = yaml.dump(JSON.parse(jsonDocument));

  fs.writeFileSync('./docs/openapi/swagger-spec.yaml', yamlDocument);
};
