import { useContext, useState, useEffect, Fragment } from 'react';

import { useParams } from 'react-router-dom/dist';

import { CategoryTitle, CategoryContainer } from './category.styles.jsx';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
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