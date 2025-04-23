import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('ipro')
export class AppController {
  @Get('images')
  getImage(@Query('filename') filename: string, @Query('width') width: string, @Query('height') height: string, @Res() res: Response) {
    const imagePath = join(__dirname, '..', 'images', filename);
    res.sendFile(imagePath);
  }
}
