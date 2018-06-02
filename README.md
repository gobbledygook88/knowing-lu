# Knowing LU

## Where does the name come from?

Let's just leave [this here](https://www.youtube.com/watch?v=iUrzicaiRLU)

## Credits

* Geoff Marshall's [videos](https://www.youtube.com/watch?v=qJc9IDT-kqQ) for [inspiration](https://www.youtube.com/watch?v=sGuetKsW5Ek)
* [TFL tube map](https://tfl.gov.uk/maps/track/tube)
* Web font: [Hammersmith One](https://fonts.google.com/specimen/Hammersmith+One)
* SVG library: [svg-pan-zoom](https://github.com/ariutta/svg-pan-zoom)

## Development

First iteration was written in vanilla Javascript as a proof of concept.
It was then refactored to use [React](https://reactjs.org/) (because I wanted
to learn it and play around) with [`create-react-app`](https://github.com/facebook/create-react-app).

Local development is straightforward:

```
git clone https://github.com/gobbledygook88/knowing-lu.git
cd knowing-lu
npm install
npm start
```

The online version is hosted on Github Pages and deployed with [`gh-pages`](https://github.com/tschaub/gh-pages).

### Testing

Testing is currently in its infancy; they will be written soon.

## Roadmap

Here are a list of features which are nice to have:

* Current progress for each line and zone
* Acheivement badges, e.g. one for each line and zone
* Panning to last correct station (this is in the works, but not yet working correctly)
* Storage of state to some cloud service for cross-device use
* Statistics - local and global
