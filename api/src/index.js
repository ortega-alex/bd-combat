import app from './app';
import { PORT } from './utilities';

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
