import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import * as bodyParser from "body-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix("v1");
  // the next two lines did the trick
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  const port: number = 3000;
  const options = new DocumentBuilder()
    .setTitle("auto-buddy-app-api")
    .setDescription("A documentation for auto-buddy-app-api")
    .setVersion("1.0")
    .build();
  // the next two lines did the trick
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger", app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
    customfavIcon: "https://avatars0.githubusercontent.com/u/7658037?v=3&s=200",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
    ],
    customCssUrl: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
    ],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000, () => {
    console.log("[WEB]", "auto-buddy-app-api.vercel.app" + "/swagger");
  });
}
bootstrap();
