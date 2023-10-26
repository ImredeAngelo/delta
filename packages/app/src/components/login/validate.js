export default function validate(e) {
    const { mail, pass } = e.target;

    const mailMatchesPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(mail.value);
    
    if(!mailMatchesPattern) {
        console.error("Invalid e-mail address. TODO: Global overlay for errors.")
        return false;
    }

    return true;
}