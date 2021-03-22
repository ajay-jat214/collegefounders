import React, { forwardRef, useRef } from 'react';
import {VerticalAlignTopOutlined} from '@ant-design/icons';

const Article = forwardRef(({ onBackClick }, ref) => {
    return (
        <article>
            <VerticalAlignTopOutlined onClick={onBackClick} style={{fontSize:'46px',color: 'white',background:"#f44336",borderRadius:"10px",position:"fixed",bottom:"24px",right:"24px"}}/>
        </article>
    );
})

export default Article;