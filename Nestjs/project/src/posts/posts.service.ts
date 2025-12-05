/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
// import { Post } from './interfaces/post.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    const singlePost = await this.postsRepository.findOneBy({ id });

    if (!singlePost) {
      throw new NotFoundException('Post is not found');
    }

    return singlePost;
  }

  async create(createPostData: CreatePostDto): Promise<Post> {
    const newPost: Post = this.postsRepository.create({
      title: createPostData.title,
      content: createPostData.content,
      authorName: createPostData.authorName,
    });

    return this.postsRepository.save(newPost);
  }

  async update(id: number, updatePostData: UpdatePostDto): Promise<Post | any> {
    const findPostToUpdate: any = await this.postsRepository.findOneBy({ id });

    if (updatePostData.title) findPostToUpdate!.title = updatePostData.title;
    if (updatePostData.content)
      findPostToUpdate!.content = updatePostData.content;
    if (updatePostData.authorName)
      findPostToUpdate!.authorName = updatePostData.authorName;

    return this.postsRepository.save(findPostToUpdate);
  }

  async remove(id: number): Promise<void> {
    const findPostToDelete = await this.findOne(id);

    await this.postsRepository.remove(findPostToDelete);
  }
}
