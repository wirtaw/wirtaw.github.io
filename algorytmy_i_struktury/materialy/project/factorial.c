/*
Vladimir Poplavskij. Wykladowca
* -----------------
 Porownanie obliczenia silni metoda rekurencii i przez petla
 Silnia.
* -----------------
2022-11-08
*/

#include <stdio.h>
#include <time.h>

#define SIZE 10

int silnia(int n);
void row(int n);

int main(void) {
	int arr[] = {0,1,3,5,7,9,11,13,15,16};

	for (int i = 0; i < SIZE; i++) {
		row(arr[i]);
	}

	return 0;
}

int silnia(int n) {
	if (n == 0 || n == 1) {
		return 1;
	} else {
		return n * silnia(n - 1);
	}
}

void row(int n) {
	clock_t t;
	t = clock();
	int s = silnia(n);

	printf("Silnia %d! = %d \n", n, s);
	t = clock() - t;
	double time_taken = ((double)t)/CLOCKS_PER_SEC;

	printf("obliczenie silni metoda rekurencii trwalo %f seconds \n", time_taken);

	s = 1;
	t = clock();
	while (n > 0) {
		s = n * s;
		n = n - 1;
	}

	printf("Silnia = %d \n", s);
	t = clock() - t;
	time_taken = ((double)t)/CLOCKS_PER_SEC;

	printf("obliczenie silni petla trwalo %f seconds \n", time_taken);
}
