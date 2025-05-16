# stylex-dev

A lightweight UMD shim for prototyping [StyleX](https://github.com/facebook/stylex) in the browser, attempting to replace the deprecated [`@stylexjs/dev-runtime`](https://www.npmjs.com/package/@stylexjs/dev-runtime). It supports the 90% use case and simplifies prototyping with AI tools like [Grok](https://grok.com/) and [ChatGPT](https://chatgpt.com/) by enabling StyleX-style code without constraining the browser environment to [StackBlitz](https://stackblitz.com/edit/vitejs-vite-3vkyxg) or relying on local code editors just to get started.

To be clear: This is a poor man's solution to quickly validate ideas and minimize code editor handoff friction. It is not intended for production use, nor optimized for performance or 100% compatibility (a long-term goal may be to improve this).

## Features

- Supports [`stylex.create`](https://stylexjs.com/docs/api/javascript/create/) for defining styles.
- Handles [`stylex.props`](https://stylexjs.com/docs/api/javascript/props/) for applying styles, including pseudo-classes (e.g., `:hover`, `:focus`).
- Implements [`stylex.keyframes`](https://stylexjs.com/docs/api/javascript/keyframes/) for CSS animations.

## Basic Example

<small>This is also provided as source code [here](/examples/basic.html).</small><br>
<small>This is also provided as a hosted web demo [here](https://68271e09ee75fc38a25addb6--stylex-dev.netlify.app/basic.html).</small>

```html
<!DOCTYPE html>
<html>
<head>
  <title>StyleX React Prototype</title>
  <!-- Include React/React DOM -->
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <!-- Include Babel (necessary for JSX transpilation) -->
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <!-- Include the shim -->
  <script src="https://unpkg.com/stylex-dev@0.0.4/stylex-dev.umd.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    // Make StyleX a global reference, similar to import * as stylex from "@stylexjs/stylex";
    const stylex = window.stylex;

    // Define a keyframe animation using stylex.keyframes
    const fadeIn = stylex.keyframes({
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    });

    // Define styles using stylex.create
    const styles = stylex.create({
      container: {
        padding: 20,
        backgroundColor: '#f0f0f0',
        animationName: fadeIn,
        animationDuration: '1s',
      },
      button: {
        padding: 10,
        backgroundColor: '#007bff',
        color: 'white',
        ':hover': {
          default: null,
          backgroundColor: '#0056b3',
        },
      },
    });

    // Create a simple React component
    const App = () => (
      <div {...stylex.props(styles.container)}>
        <button {...stylex.props(styles.button)}>Click Me</button>
      </div>
    );

    // Render the React component
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
```

> [!TIP]
> Add something like the above to your favorite AI chat app's system prompt so you can quickly prototype and validate ideas in the browser! This should work in most AI apps that support artifacts like [Claude](https://www.anthropic.com/claude), [ChatGPT](https://chatgpt.com/), and [Grok](https://www.x.ai/grok).
>
> Here is an [example prompt](https://gist.github.com/zaydek/af6c69491f3cd6f1f1b835fc3941e799) to get you started. YMMV.

## Comprehensive Example

<small>This is also provided as source code [here](/examples/comprehensive.html).</small><br>
<small>This is also provided as a hosted web demo [here](https://68271e09ee75fc38a25addb6--stylex-dev.netlify.app/comprehensive.html).</small>

```html
<!DOCTYPE html>
<html>
<head>
  <title>Todo App with React + StyleX</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
  <script src="https://unpkg.com/stylex-dev@0.0.4/stylex-dev.umd.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const stylex = window.stylex;

    const slideIn = stylex.keyframes({
      '0%': { transform: 'translateY(-20px)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 },
    });

    const shimmer = stylex.keyframes({
      '0%': { backgroundPosition: '-200px 0' },
      '100%': { backgroundPosition: '200px 0' },
    });

    const containerStyles = stylex.create({
      main: {
        maxInlineSize: '600px',
        margin: '20px auto',
        padding: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        fontFamily: '"Karla", sans-serif',
      },
      title: {
        color: '#333',
        fontSize: 20,
        marginBlockEnd: 20,
        textAlign: 'center',
        fontFamily: '"Karla", sans-serif',
      },
    });

    const inputStyles = stylex.create({
      wrapper: {
        display: 'flex',
        gap: 10,
        marginBlockEnd: 20,
      },
      input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        border: '1px solid #ddd',
        borderRadius: 4,
        fontFamily: '"Karla", sans-serif',
        ':focus': {
          default: null,
          outline: '2px solid #007bff',
          borderColor: 'transparent',
        },
      },
      button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        fontFamily: '"Karla", sans-serif',
        fontSize: 14,
        ':hover': {
          default: null,
          backgroundColor: '#0056b3',
        },
      },
    });

    const taskStyles = stylex.create({
      list: {
        listStyle: 'none',
        padding: 0,
      },
      item: {
        display: 'flex',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 4,
        marginBlockEnd: 10,
        animationDuration: '0.3s',
        animationName: slideIn,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        fontFamily: '"Karla", sans-serif',
      },
      text: {
        flex: 1,
        fontSize: 14,
        color: '#333',
        textDecoration: {
          default: 'none',
          completed: 'line-through',
        },
        fontFamily: '"Karla", sans-serif',
      },
      checkbox: {
        marginInlineEnd: 10,
        inlineSize: 20,
        blockSize: 20,
        cursor: 'pointer',
      },
      delete: {
        padding: '5px 10px',
        backgroundColor: '#ff4d4f',
        color: 'white',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        fontFamily: '"Karla", sans-serif',
        fontSize: 14,
        ':hover': {
          default: null,
          backgroundColor: '#cc0000',
        },
      },
    });

    const skeletonStyles = stylex.create({
      main: {
        maxInlineSize: '600px',
        margin: '20px auto',
        padding: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
      title: {
        inlineSize: 200,
        blockSize: 24,
        background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
        backgroundSize: '200px 100%',
        animationName: shimmer,
        animationDuration: '1.5s',
        animationIterationCount: 'infinite',
        borderRadius: 4,
        margin: '0 auto 20px',
      },
      wrapper: {
        display: 'flex',
        gap: 10,
        marginBlockEnd: 20,
      },
      input: {
        flex: 1,
        blockSize: 40,
        background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
        backgroundSize: '200px 100%',
        animationName: shimmer,
        animationDuration: '1.5s',
        animationIterationCount: 'infinite',
        borderRadius: 4,
      },
      button: {
        inlineSize: 80,
        blockSize: 40,
        background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
        backgroundSize: '200px 100%',
        animationName: shimmer,
        animationDuration: '1.5s',
        animationIterationCount: 'infinite',
        borderRadius: 4,
      },
      task: {
        blockSize: 40,
        background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
        backgroundSize: '200px 100%',
        animationName: shimmer,
        animationDuration: '1.5s',
        animationIterationCount: 'infinite',
        borderRadius: 4,
        marginBlockEnd: 10,
      },
    });

    const SkeletonLoader = () => {
      return (
        <div {...stylex.props(skeletonStyles.main)}>
          <div {...stylex.props(skeletonStyles.title)}></div>
          <div {...stylex.props(skeletonStyles.wrapper)}>
            <div {...stylex.props(skeletonStyles.input)}></div>
            <div {...stylex.props(skeletonStyles.button)}></div>
          </div>
          <div {...stylex.props(skeletonStyles.task)}></div>
          <div {...stylex.props(skeletonStyles.task)}></div>
        </div>
      );
    };

    const TodoApp = () => {
      const [tasks, setTasks] = React.useState([]);
      const [newTask, setNewTask] = React.useState('');
      const [isLoading, setIsLoading] = React.useState(true);

      // Load tasks from local storage on mount
      React.useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
      }, []);

      // Save tasks to local storage whenever tasks change
      React.useEffect(() => {
        if (!isLoading) {
          localStorage.setItem('tasks', JSON.stringify(tasks));
        }
      }, [tasks, isLoading]);

      const addTask = () => {
        if (newTask.trim() === '') return;
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
        setNewTask('');
      };

      const toggleTask = (id) => {
        setTasks(tasks.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        ));
      };

      const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
      };

      const handleKeyPress = (e) => {
        if (e.key === 'Enter') addTask();
      };

      if (isLoading) {
        return <SkeletonLoader />;
      }

      return (
        <div {...stylex.props(containerStyles.main)}>
          <h1 {...stylex.props(containerStyles.title)}>Todo App</h1>
          <div {...stylex.props(inputStyles.wrapper)}>
            <input
              {...stylex.props(inputStyles.input)}
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
            />
            <button
              {...stylex.props(inputStyles.button)}
              onClick={addTask}
            >
              Add
            </button>
          </div>
          <ul {...stylex.props(taskStyles.list)}>
            {tasks.map(task => (
              <li
                {...stylex.props(taskStyles.item)}
                key={task.id}
              >
                <input
                  {...stylex.props(taskStyles.checkbox)}
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span {...stylex.props(taskStyles.text, task.completed && taskStyles.text.completed)}>
                  {task.text}
                </span>
                <button
                  {...stylex.props(taskStyles.delete)}
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    };

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<TodoApp />);
  </script>
</body>
</html>
```

> [!TIP]
> Add something like the above to your favorite AI chat app's system prompt so you can quickly prototype and validate ideas in the browser! This should work in most AI apps that support artifacts like [Claude](https://www.anthropic.com/claude), [ChatGPT](https://chatgpt.com/), and [Grok](https://www.x.ai/grok).
>
> Here is an [example prompt](https://gist.github.com/zaydek/af6c69491f3cd6f1f1b835fc3941e799) to get you started. YMMV.

## Limitations

- Covers only the 90% use case: `stylex.keyframes`, `stylex.create`, and `stylex.props`.
- Support is limited to React, though it may technically work with other libraries (untested).
- Limited support for pseudo-classes (e.g., `:hover`, `:focus`), though others may work (untested).
- ‼️ DEOPTIMIZED ‼️ This is not intended for production!

## Future

If useful, I may add support for APIs like [`stylex.defineVars`](https://stylexjs.com/docs/api/javascript/defineVars/) and [`stylex.createTheme`](https://stylexjs.com/docs/api/javascript/createTheme/), etc. to better close the gap.

## License

[MIT](https://github.com/zaydek/stylex-dev/README.md)
