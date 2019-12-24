import React, {Fragment} from "react";

export default function ArticleList({articles}){
    return (
        <Fragment>
            {
                articles.length > 0 && articles.map((article, i) => {
                    return (
                        <div key={ i }>
                            { article.id }: { article.title }
                        </div>
                    );
                })
            }
        </Fragment>
    );
}
