module.exports={
    generateId: (name)=> {
        return `input-${name}-${Math.random().toString(36).substr(2, 9)}`;
      },
      format_date: (date) => {
        return date.toLocaleDateString();
      }
}