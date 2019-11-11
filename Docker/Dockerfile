FROM tensorflow/tensorflow:latest-gpu

RUN export DEBIAN_FRONTEND=noninteractive
ARG DEBIAN_FRONTEND=noninteractive
RUN apt update -y -q

COPY dependencies.conf /usr/src/app/
RUN apt install -y -q $(cat /usr/src/app/dependencies.conf) --fix-missing

RUN git clone https://github.com/neekonsu/bismarck
RUN git clone https://github.com/neekonsu/pupil
RUN git clone https://github.com/neekonsu/liblsl-Android

EXPOSE 5000
