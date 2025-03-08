# Remarket Emoji

This project uses Firebase Cloud Functions to manage and display counters with emoji-based labels.

## Setup

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd remarket-emoji
    ```

2. Install dependencies:
    ```sh
    cd functions
    npm install
    ```

3. Deploy the functions:
    ```sh
    firebase deploy --only functions
    ```

## Functions

### `getCounter`

Fetches the counter value with an emoji-based label.

- **URL**: `/getCounter`
- **Method**: `GET`
- **Query Parameters**:
  - `name` (required): The name of the counter.

### `incrementCounter`

Increments the counter value.

- **URL**: `/incrementCounter`
- **Method**: `GET`
- **Query Parameters**:
  - `name` (required): The name of the counter.

## License

This project is licensed under the MIT License.