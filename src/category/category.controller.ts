import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {UpdateCategoryDto} from "./update_category.dto";
import {CreateCategoryDto} from "./create_category.dto";

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {
    }

    @Get()
    getAll() {
        return this.categoryService.getAll();
    }

    @Post()
    create(@Body() data: CreateCategoryDto) {
        return this.categoryService.create(data);
    }

    @Get(':id')
    getSubjectById(@Param('id') id: number) {
        return this.categoryService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id:number,
        @Body() data : UpdateCategoryDto
    )  {
        return await this.categoryService.update(id,data);
    }

    @Delete(':id')
    delete(@Param('id') id:number) {
        return this.categoryService.delete(id);
    }
}
