// Main application entry point
console.log('Hello from TypeScript!');

// Example TypeScript code with type annotations
interface User {
  id: number;
  name: string;
  email: string;
}

class Application {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
    console.log(`User ${user.name} added successfully!`);
  }

  listUsers(): void {
    console.log('Current users:');
    this.users.forEach(user => {
      console.log(`- ${user.name} (${user.email})`);
    });
  }
}

// Initialize and run the application
const app = new Application();

app.addUser({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
});

app.listUsers();

export { Application };