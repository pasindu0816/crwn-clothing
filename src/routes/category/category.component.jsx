import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/dist';

import { CategoryTitle, CategoryContainer } from './category.styles.jsx';
import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap } from '../../store/categories/category.selector.js';

const Category = () => {
    const { category } = useParams();
    const  categoriesMap  = useSelector(selectCategoriesMap);
    const [ products, setProducts ] = useState(categoriesMap[category]);

    useEffect(() => { 
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {products &&                                        //safeguarding (only render the component if the actual data is present)
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </CategoryContainer>
        </Fragment>
        
    )

};

export default Category;