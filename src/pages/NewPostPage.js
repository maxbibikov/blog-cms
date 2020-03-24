import React from 'react';

// Components
import { PostForm } from '../components/PostForm';
import { AuthContext } from '../App';

export function NewPost() {
  return (
    <AuthContext.Consumer>
      {authorized => <PostForm authorized={authorized} />}
    </AuthContext.Consumer>
  );
}
