export function generateUser() {
    const number = Math.floor(Math.random() * 1000);
    return {
        firstName: 'John' + number,
        lastName: 'Doe' + number,
        postalCode: '12345'
    };
}