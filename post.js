document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector('.content');
  const wrapper = document.querySelector('.wrapper');
  let lastScrollTop = 0;

  const photoPostPairs = [
    { photoId: 'photo1', postId: 'post1' },
    { photoId: 'photo2', postId: 'post2' },
    { photoId: 'photo3', postId: 'post3' },
    { photoId: 'photo4', postId: 'post4' },
    { photoId: 'photo5', postId: 'post5' },
    { photoId: 'photo6', postId: 'post6' },
    { photoId: 'photo7', postId: 'post7' },
    { photoId: 'photo8', postId: 'post8' },
    { photoId: 'photo9', postId: 'post9' },
    { photoId: 'photo10', postId: 'post10' },
    { photoId: 'photo11', postId: 'post11' },
    { photoId: 'photo12', postId: 'post12' },
    { photoId: 'photo13', postId: 'post13' },
    { photoId: 'photo14', postId: 'post14' },
    { photoId: 'photo15', postId: 'post15' },
    { photoId: 'photo16', postId: 'post16' },
    { photoId: 'photo17', postId: 'post17' },
    { photoId: 'photo18', postId: 'post18' },
    { photoId: 'photo19', postId: 'post19' },
    { photoId: 'photo20', postId: 'post20' },
    { photoId: 'photo21', postId: 'post21' },
    { photoId: 'photo22', postId: 'post22' },
    { photoId: 'photo23', postId: 'post23' },
    { photoId: 'photo24', postId: 'post24' },
    { photoId: 'photo25', postId: 'post25' },
    { photoId: 'photo26', postId: 'post26' },
    { photoId: 'photo27', postId: 'post27' }
  ];
  

  // Set up each photo → post pair
  photoPostPairs.forEach(({ photoId, postId }) => {
    const photo = document.getElementById(photoId);
    const post = document.getElementById(postId);

    if (photo && post) {
      photo.style.cursor = 'pointer';

      photo.addEventListener('click', () => {
        lastScrollTop = content.scrollTop;
        wrapper.style.display = 'none';
        post.classList.remove('hidden');

        requestAnimationFrame(() => {
          post.classList.add('visible');
        });
      });

      const closeBtn = post.querySelector('.close-post');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          post.classList.remove('visible');
          setTimeout(() => {
            post.classList.add('hidden');
            wrapper.style.display = 'block';
            content.scrollTop = lastScrollTop;
          }, 0);
        });
      }
    }
  });

  // ESC key closes any open post
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const visiblePost = document.querySelector('.post.visible');
      if (visiblePost) {
        visiblePost.classList.remove('visible');
        setTimeout(() => {
          visiblePost.classList.add('hidden');
          wrapper.style.display = 'block';
          content.scrollTop = lastScrollTop;
        }, 300);
      }
    }
  });
});
