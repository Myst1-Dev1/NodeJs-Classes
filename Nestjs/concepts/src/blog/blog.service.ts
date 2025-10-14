import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
  private readonly blogs = [
    {
      id: 1,
      blogTitle: 'blog 1',
      blogUniqueKey: 'blogUniqueKey1',
    },
    {
      id: 2,
      blogTitle: 'blog 2',
      blogUniqueKey: 'blogUniqueKey1',
    },
    {
      id: 3,
      blogTitle: 'blog 3',
      blogUniqueKey: 'blogUniqueKey3',
    },
    {
      id: 4,
      blogTitle: 'blog 4',
      blogUniqueKey: 'blogUniqueKey4',
    },
    {
      id: 5,
      blogTitle: 'blog 5',
      blogUniqueKey: 'blogUniqueKey5',
    },
  ];

  findAll() {
    return this.blogs;
  }

  findById(id: number) {
    return this.blogs.find((blog) => blog.id === id);
  }

  findByUniqueKey(key: string) {
    return this.blogs.filter((blog) => blog.blogUniqueKey === key);
  }
}
