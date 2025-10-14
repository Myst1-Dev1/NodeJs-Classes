import { Controller, Get, Param } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Get()
  findAll(): any {
    return this.blogService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): any {
    return this.blogService.findById(+id);
  }

  @Get('by-unique-key/:key')
  findByBlogUniqueKey(@Param('key') key: string): any {
    return this.blogService.findByUniqueKey(key);
  }
}
