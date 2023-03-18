export const getColorRating = (rating) => {
    return rating < 3.5 ? 'lowestRating' : rating <= 5&&rating>=3.5 ?'lowRating' :rating <= 6.5&&rating>=5 ? 'midRating' : rating<=7.5&&rating>6.5 ? 'goodRating' : rating<=10&&rating>7.5 ? 'bestRating' : '' 
}