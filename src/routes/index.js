import { createRouter, createWebHistory } from 'vue-router';
import { Home, Movies, MovieDetail, NotFound } from './pages';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
    },
    {
      name: 'movies',
      path: '/keyword/:keyword',
      component: Movies,
    },
    {
      name: 'movie',
      path: '/movie/:id',
      component: MovieDetail,
    },
    {
      name: 'notFound',
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});
