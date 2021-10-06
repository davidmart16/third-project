import './index.css'

export const rateStar = (rate) => {

    if(rate < 0.5)return <div className='rating'>☆☆☆☆☆</div>
    else if (rate > 0.5 && rate <= 1.5) return <div className='rating'>★☆☆☆☆</div>
    else if (rate > 1.5 && rate <= 2.5) return <div className='rating'>★★☆☆☆</div>
    else if (rate > 2.5 && rate <= 3.5) return <div className='rating'>★★★☆☆</div>
    else if (rate > 3.5 && rate <= 4.5) return <div className='rating'>★★★★☆</div>
    else if (rate > 4.5 && rate <= 5) return <div className='rating'>★★★★★</div>
    
}

export default rateStar;
