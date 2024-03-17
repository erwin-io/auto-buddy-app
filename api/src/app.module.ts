import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { HttpModule } from "@nestjs/axios";
@Module({
  imports: [
    HttpModule,
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
