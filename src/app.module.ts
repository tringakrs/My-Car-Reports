import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    //only set the ConfigModule one time then we have use this throughout the rest of the app dmth globally so to do this we set isGlobal: true
    ConfigModule.forRoot({
      isGlobal: true,
      //which of the env files we want to use
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',

          host: config.get<string>('DB_HOST'),

          port: config.get<number>('DB_PORT'),

          username: config.get<string>('DB_USERNAME'),

          password: config.get<string>('DB_PASSWORD'),

          database: config.get<string>('DB_NAME'),

          // type: 'sqlite',
          // database: config.get<string>('DB_NAME'),
          synchronize: true,
          entities: [User, Report],
        };
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Report],
    //   synchronize: true,
    // }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    //te 143
  ],
})
export class AppModule {}
