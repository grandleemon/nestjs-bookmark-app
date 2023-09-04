import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import {
  CreateBookmarkDto,
  EditBookmarkDto,
} from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    private readonly bookmarkService: BookmarkService,
  ) {}

  @Get()
  getBookmarks(@GetUser('id') id: number) {
    return this.bookmarkService.getBookmarks(id);
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('id') id: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarkById(
      id,
      bookmarkId,
    );
  }

  @Post()
  createBookmark(
    @GetUser('id') id: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(
      id,
      dto,
    );
  }

  @Patch(':id')
  async editBookmarkById(
    @GetUser('id') id: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return await this.bookmarkService.editBookmarkById(
      id,
      bookmarkId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteBookmarkById(
    @GetUser('id') id: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return await this.bookmarkService.deleteBookmarkById(
      id,
      bookmarkId,
    );
  }
}
