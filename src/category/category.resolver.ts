import { Args, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './models/category.model';

@Resolver((of) => Category)
export class CategoryResolver {
    constructor(private readonly categoryService: CategoryService) {}

    @Query((returns) => [Category], { name: 'GetAllCategory' })
    async getAllCategory() {
        return this.categoryService.getAllCategory();
    }

    @Query((returns) => Category, { name: 'GetCategoryById' })
    async getCategoryById(@Args('id') id: number) {
        return this.categoryService.getCategoryById(id);
    }
}
