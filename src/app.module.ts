import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { EventsGateway } from './events/events.gateway';
import { ConfigModule } from '@nestjs/config';
import { DiffRoomsService } from './diff/diff-rooms.service';
import { DiffGateway } from './diff/diff.gateway';
import { DiffController } from './diff/diff.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RoomsModule,
  ],
  controllers: [AppController, DiffController],
  providers: [AppService, EventsGateway, DiffRoomsService, DiffGateway],
})
export class AppModule {}
