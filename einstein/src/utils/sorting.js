export const sortWithTime = (posts = []) => {
    return posts?.sort((a, b) => {
        return new Date(b.CreateDate) - new Date(a.CreateDate);
    }).slice(0, 6);
}