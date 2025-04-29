import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { fromRichTextHtml } from 'ricos-content/dist/cjs/lib/server-side-converters.js';

@Controller('api')
export class ApiController {
  @Post('convert')
  convertHtmlToRicos(@Body('htmlString') htmlString: string) {
    if (!htmlString) {
      throw new HttpException('htmlString is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const ricosContent = fromRichTextHtml(htmlString);
      return { ricosContent };
    } catch (error) {
      console.error('Error converting HTML:', error);
      throw new HttpException(
        { message: 'Failed to convert HTML', details: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}