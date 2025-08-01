import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchEngineModule } from './features/search-engine/search-engine.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SearchEngineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
